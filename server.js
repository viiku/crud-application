
const dotenv = require('dotenv');
dotenv.config({ path: './config.env'});

const app = require('./');

//  server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is running on port ${port}...`)
});