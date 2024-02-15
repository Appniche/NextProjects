// <---- App Libraries ---->
const express = require("express");
const router = express.Router();

//<---- Image taking as input Modules ---->
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Backend Modules
const accountCreate = require('../backend_modules/account_create');
const authenticate = require('../backend_modules/authenticate');
const insert_db = require('../backend_modules/insert_apis');

// Login
router.post("/login", async function(request, response) 
{
    const { username, password } = request.body;

    try 
    {
        const loginResult = await authenticate.admin_login(username, password);

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
    const { username, email, password } = request.body;
    try 
    {
        const registrationResult = await accountCreate.admin_register(username, email, password);

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

// Insertion APIs for admin
router.post("/insert/products", upload.single('image') ,async function(request, response)
{
    const category = request.body.category;
    const subcategory = request.body.subcategory;
    const title = request.body.title;
    const description = request.body.description;
    const price = request.body.price;
    const company = request.body.company;
    const ratings = request.body.ratings;
    const imageBuffer = request.file.buffer;
    try
    {
        const insertionResult = await insert_db.products(category, subcategory, title, description, price, company, ratings, imageBuffer);
        // Check the return code to determine success or failure
        if (insertionResult.returncode === 0)
        {
            response.status(200).send({'returncode': 0, 'message': insertionResult.message, 'output': insertionResult.output});      
        }
        else
        {
            response.status(400).send({'returncode': 1, 'message': insertionResult.message, 'output': insertionResult.output});
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