// <---- Required Libraries ---->
const express = require('express');
const router = express.Router();
router.use(express.json());

// <---- Image taking as input Modules ---->
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// <---- Backend Modules ---->
const account = require('../backend_modules/root/account');

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
            response.status(200).send({'returncode': 0, 'message': 'Authentication Verified', 'output': []});
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
    const { username, password ,email } = request.body
    try 
    {
        const registrationResult = await account.account_create(username, password ,email);
        
        // Check the return code to determine success or failure
        if (registrationResult.returncode === 0)
        {
            response.status(200).send({'returncode': 0, 'message': 'User Created Successfully', 'output': []});
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

module.exports = router;