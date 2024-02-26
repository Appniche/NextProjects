// <---- App Libraries ---->
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

//<---- App Configuration ---->
const app = express();
const port = 3000;
const host = '0.0.0.0'; 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Allow CORS (Cross-Origin Resource Sharing) to accept requests from Astro.js app running on port 4321
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4321');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(cors());

// Importing route files
const studentRouter = require('./routes/student');

// --------------------------
//<---- Using route file ---->
app.use('/api/student', studentRouter);

// --------------------------

app.listen(port, host, function (err) {
  if (err) console.log(err);
  console.log(`Server is running on http://${host}:${port}`);
});