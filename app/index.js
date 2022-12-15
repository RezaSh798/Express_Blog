const express = require('express');
const app = express();

require('./bootstrap')(app);
require('./middlewares')(app);
require('./routes/index')(app);

module.exports = () => {
    const port = process.env.APP_PORT;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}