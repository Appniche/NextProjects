const express = require('express');
const app = express();
const port = 3000;

// Importing route files
const authApiRouter = require('./routes/routes');

// Using route file
app.use('/api/v1/', authApiRouter);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});