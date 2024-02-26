// <---- Required Libraries ---->
const express = require('express');
const router = express.Router();
router.use(express.json());
var session = require('express-session');
var cookieParser = require('cookie-parser');

// <---- Session Variable ---->
router.use(cookieParser());
router.use(session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: true
  }));
  
// <---- Image taking as input Modules ---->
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// <---- Backend Modules ---->
const account = require('../backend_modules/students/account');
const fetch = require('../backend_modules/students/fetch');
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
			const user = loginResult.output.Student_Id;
            request.session.user = user;
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
            const user = registrationResult.output.Student_Id;
            request.session.user = user;
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

    if (request.session.userid) 
    {
        const userid = request.session.session_id;
        const { username, password ,email, phone  } = request.body
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
    }
    else 
    {
        response.status(400).send({'returncode': 1, 'message': 'No Session Found Please login or register', 'output': []});
    }
});


// Logout
router.get("/logout", async function(request, response)
{
    try
    {
        if (request.session) 
        {
            request.session.destroy();
            response.status(200).send({'returncode': 0, 'message': 'User Logged Out Successfully', 'output': []});
        }
        else 
        {
            response.status(400).send({'returncode': 1, 'message': 'No Session Found Please login or register', 'output': []});
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

// User Registration Fetch
router.get("/account/details/fetch", async function(request, response)
{
    const userid = request.session.user;
    if (request.session.user) 
    {
        try 
        {
            const fetchResult = await fetch.registration_info(userid);
            
            // Check the return code to determine success or failure
            if (fetchResult.returncode === 0)
            {
                response.status(200).send({'returncode': 0, 'message': 'User Account Registration Fetched Successfully', 'output': fetchResult.output});
            }
            else 
            {
                response.status(400).send({'returncode': 1, 'message': fetchResult.message, 'output': fetchResult.output});
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
    }
    else 
    {
        response.status(400).send({'returncode': 1, 'message': 'No Session Found Please login or register', 'output': []});
    }
});

// User Registration Add
router.post("/account/details/add", upload.single('image'), async function(request, response)
{

    if (request.session.user) 
    {
        const userid = request.session.user;
        const first_name = request.body.first_name;
        const last_name = request.body.last_name;
        const dob = request.body.dob;
        const address = request.body.address;
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
    }
    else 
    {
        response.status(400).send({'returncode': 1, 'message': 'No Session Found Please login or register', 'output': []});
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

// User Registration Fetch
router.get("/account/document/fetch", async function(request, response)
{
    const userid = request.session.user;
    if (request.session.user) 
    {
        try 
        {
            const fetchResult = await fetch.document_info(userid);
            
            // Check the return code to determine success or failure
            if (fetchResult.returncode === 0)
            {
                response.status(200).send({'returncode': 0, 'message': 'User Account Document Fetched Successfully', 'output': fetchResult.output});
            }
            else 
            {
                response.status(400).send({'returncode': 1, 'message': fetchResult.message, 'output': fetchResult.output});
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
    }
    else 
    {
        response.status(400).send({'returncode': 1, 'message': 'No Session Found Please login or register', 'output': []});
    }
});

// Documents add
router.post("/account/document/add", upload.single('image'), async function(request, response)
{
    if(request.session.user)
    {
        const userid = request.session.user;
        const doc_name = request.body.doc_name;
        // const doc_buffer = request.file.buffer;
        const doc_buffer = request.body.doc;
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
    }
    else 
    {
        response.status(400).send({'returncode': 1, 'message': 'No Session Found Please login or register', 'output': []});
    }
});

// Document Delete
router.post("/account/document/delete", async function(request, response)
{
    if(request.session.userid)
    {    
        const { doc_id } = request.body
        const userid = request.session.userid;
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
    }
    else 
    {
        response.status(400).send({'returncode': 1, 'message': 'No Session Found Please login or register', 'output': []});
    }
});

module.exports = router;