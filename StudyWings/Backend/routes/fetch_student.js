// <---- Required Libraries ---->
const express = require('express');
const router = express.Router();
router.use(express.json());

// <---- Image taking as input Modules ---->
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// <---- Backend Modules ---->
const registration = require('../backend_modules/students/fetch');

// -------------------------------------------
// <------- User Account Registration ------->
// -------------------------------------------


// Login
router.post("/registration", async function(request, response) 
{
    const { user_id } = request.body;
    try 
    {
        const loginResult = await registration.registration_info(user_id);
        if (loginResult.returncode === 0) 
        {
            response.status(200).send({'returncode': 0, 'message': 'Data fetched', 'output': loginResult.output});
        }
    }

    catch (error)
    {
        response.status(500).send({'returncode': 1, 'message': 'Data not Found', 'output': []});
    }
});

module.exports = router;