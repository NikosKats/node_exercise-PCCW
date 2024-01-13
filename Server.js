require('dotenv').config();
const http = require('http');
const app = require('./App');

const sequelize = require('./utils/database'); 

sequelize.sync().then(() => {
    console.log('Tables created!');
}).catch((error) => {
    console.error('Error creating tables:', error);
});

const port = 3000;
const server = http.createServer(app);
server.listen(port);