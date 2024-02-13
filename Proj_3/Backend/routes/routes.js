const express = require('express');
const router = express.Router();

// Backend Modules
const accountCreate = require('../backend_modules/account_create');
const fetch_apis = require('../backend_modules/fetch_apis');
const authenticate = require('../backend_modules/authenticate');

// Login
router.post("/login", async function(request, response) 
{
    const { username, password } = request.body;

    try 
    {
        const loginResult = await authenticate.login(username, password);

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
    const {name, email, password} = request.body
    try 
    {
        const registrationResult = await accountCreate.register(name, email, password);
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

// Fetch APIs for admin(For Dashboard)(Rest APIs)
app.get("/products", async function(request, response)
{
  try 
  {
    const fetched_result = await fetch_apis.products();

    // Check the return code to determine success or failure
    if (fetched_result.returncode === 0)
    {
      response.status(200).send({'returncode': 0, 'message': fetched_result.message, 'output': fetched_result.output});
    }
    else 
    {
      response.status(503).send({'returncode': 1, 'message': fetched_result.message, 'output': fetched_result.output});
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
      response.status(500).send({'returncode': 1, 'message': error, 'output': []});
    }
  }
});


// Company
router.post("/company", async function(request, response)
{
    const {company} = request.body
    try 
    {
        const fetchResult = await fetch_apis.company_name(company);
        // Check the return code to determine success or failure
        if (fetchResult.returncode === 0)
        {
            response.status(200).send({'returncode': 0, 'message': 'Data Fetched Successfully', 'output': fetchResult.output});
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
});


// Category
router.post("/category", async function(request, response)
{
    const {category} = request.body
    try 
    {
        const fetchResult = await fetch_apis.categories(category);
        // Check the return code to determine success or failure
        if (fetchResult.returncode === 0)
        {
            response.status(200).send({'returncode': 0, 'message': 'Data Fetched Successfully', 'output': fetchResult.output});
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
});


// Sub-Category
router.post("/subcategory", async function(request, response)
{
    const {subcategory} = request.body
    try 
    {
        const fetchResult = await fetch_apis.categories(subcategory);
        // Check the return code to determine success or failure
        if (fetchResult.returncode === 0)
        {
            response.status(200).send({'returncode': 0, 'message': 'Data Fetched Successfully', 'output': fetchResult.output});
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
});
module.exports = router;