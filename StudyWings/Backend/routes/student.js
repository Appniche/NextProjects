// <---- Required Libraries ---->
const express = require('express');
const router = express.Router();
router.use(express.json());

// <---- Image taking as input Modules ---->
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// <---- Backend Modules ---->
const account = require('../backend_modules/students/account');
const document = require('../backend_modules/students/documents');
const registration = require('../backend_modules/students/registration');

// ------------------------------
// <------- User Account ------->
// ------------------------------


// Login
router.post("/login", async function(request, response) 
{
    const { username, password } = request.body;

    try 
    {
        const loginResult = await account.account_login(username, password);

        if (loginResult.returncode === 0) 
        {
            response.status(200).send({'returncode': 0, 'message': 'Authentication Verified', 'output': loginResult.output});
        }
        else 
        {
            response.status(401).send({'returncode': 1, 'message': 'Account not Found', 'output': []});
        }
    }

    catch (error)
    {
        response.status(500).send({'returncode': 1, 'message': 'Temporary Server Down, Please try again after some time', 'output': []});
    }
});


// Register
router.post("/register", async function(request, response)
{
    const { username, password ,email, phone } = request.body
    try 
    {
        const registrationResult = await account.account_create(username, password ,email, phone);
        
        // Check the return code to determine success or failure
        if (registrationResult.returncode === 0)
        {
            response.status(200).send({'returncode': 0, 'message': 'User Created Successfully', 'output': registrationResult.output});
        }
        else 
        {
            response.status(400).send({'returncode': 1, 'message': registrationResult.message, 'output': registrationResult.output});
        }
    } 
  catch (error)
    {
        // Handle different types of errors (client-side vs server-side)
        if (error.returncode)
        {
            response.status(400).send({'returncode': 1, 'message': error.message, 'output': error.output});
        }
        else 
        {
            response.status(500).send({'returncode': 1, 'message': 'Internal Server Error', 'output': []});
        }
    }
});

// Update Account
router.post("/update", async function(request, response)
{
    const { username, password ,email, phone, userid } = request.body
    try 
    {
        const updateResult = await account.account_update(username, password, email, phone, userid);
        
        // Check the return code to determine success or failure
        if (updateResult.returncode === 0)
        {
            response.status(200).send({'returncode': 0, 'message': 'User Updated Successfully', 'output': []});
        }
        else 
        {
            response.status(400).send({'returncode': 1, 'message': updateResult.message, 'output': updateResult.output});
        }
    } 
  catch (error)
    {
        // Handle different types of errors (client-side vs server-side)
        if (error.returncode)
        {
            response.status(400).send({'returncode': 1, 'message': error.message, 'output': error.output});
        }
        else 
        {
            response.status(500).send({'returncode': 1, 'message': 'Internal Server Error', 'output': []});
        }
    }
});

// -------------------------------------------
// <------- User Account Registration ------->
// -------------------------------------------

// User Registration Add
router.post("/account/details/add", upload.single('image'), async function(request, response)
{
    const first_name = request.body.first_name;
    const last_name = request.body.last_name;
    const dob = request.body.dob;
    const address = request.body.address;
    const userid = request.body.userid;
    const profile_buffer = request.file.buffer;
    try 
    {
        const addResult = await registration.registration_details_add(first_name, last_name, dob, address, profile_buffer, userid);
        
        // Check the return code to determine success or failure
        if (addResult.returncode === 0)
        {
            response.status(200).send({'returncode': 0, 'message': 'User Account Registration Added Successfully', 'output': []});
        }
        else 
        {
            response.status(400).send({'returncode': 1, 'message': addResult.message, 'output': addResult.output});
        }
    } 
  catch (error)
    {
        // Handle different types of errors (client-side vs server-side)
        if (error.returncode)
        {
            response.status(400).send({'returncode': 1, 'message': error.message, 'output': error.output});
        }
        else 
        {
            response.status(500).send({'returncode': 1, 'message': 'Internal Server Error', 'output': []});
        }
    }
});

// User Registration Update
router.post("/account/details/update", upload.single('image'), async function(request, response)
{
    const first_name = request.body.first_name;
    const last_name = request.body.last_name;
    const dob = request.body.dob;
    const address = request.body.address;
    const registration_id = request.body.registration_id;
    const profile_buffer = request.file.buffer;

    try 
    {
        const updateResult = await registration.registration_details_update(first_name,last_name, dob, address, profile_buffer, registration_id);
        
        // Check the return code to determine success or failure
        if (updateResult.returncode === 0)
        {
            response.status(200).send({'returncode': 0, 'message': 'User Account Registration Updated Successfully', 'output': []});
        }
        else 
        {
            response.status(400).send({'returncode': 1, 'message': updateResult.message, 'output': updateResult.output});
        }
    } 
  catch (error)
    {
        // Handle different types of errors (client-side vs server-side)
        if (error.returncode)
        {
            response.status(400).send({'returncode': 1, 'message': error.message, 'output': error.output});
        }
        else 
        {
            response.status(500).send({'returncode': 1, 'message': 'Internal Server Error', 'output': []});
        }
    }
});

// --------------------------------
// <------- User Documents ------->
// --------------------------------

// Documents add
router.post("/account/document/add", upload.single('image'), async function(request, response)
{
    const userid = request.body.userid;
    const doc_name = request.body.doc_name;
    const doc_buffer = request.file.buffer;
    try 
    {
        const addResult = await document.document_add(userid, doc_name, doc_buffer);
        
        // Check the return code to determine success or failure
        if (addResult.returncode === 0)
        {
            response.status(200).send({'returncode': 0, 'message': 'Document Added Successfully', 'output': []});
        }
        else 
        {
            response.status(400).send({'returncode': 1, 'message': addResult.message, 'output': addResult.output});
        }
    } 
  catch (error)
    {
        // Handle different types of errors (client-side vs server-side)
        if (error.returncode)
        {
            response.status(400).send({'returncode': 1, 'message': error.message, 'output': error.output});
        }
        else 
        {
            response.status(500).send({'returncode': 1, 'message': 'Internal Server Error', 'output': []});
        }
    }
});

// Document Delete
router.post("/account/document/delete", async function(request, response)
{
    const { doc_id, userid } = request.body
    try 
    {
        const deleteResult = await document.document_delete(doc_id, userid);
        
        // Check the return code to determine success or failure
        if (deleteResult.returncode === 0)
        {
            response.status(200).send({'returncode': 0, 'message': 'User Deleted Successfully', 'output': []});
        }
        else 
        {
            response.status(400).send({'returncode': 1, 'message': deleteResult.message, 'output': deleteResult.output});
        }
    } 
  catch (error)
    {
        // Handle different types of errors (client-side vs server-side)
        if (error.returncode)
        {
            response.status(400).send({'returncode': 1, 'message': error.message, 'output': error.output});
        }
        else 
        {
            response.status(500).send({'returncode': 1, 'message': 'Internal Server Error', 'output': []});
        }
    }
});

module.exports = router;
