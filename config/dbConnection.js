const mysql = require('mysql');

//Create connection
const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mindfulnessapp',    
});

//Connect to MySQL
dbConnection.connect(err => {
    if(err){
        return console.error('error: ' + err.message);
    }
    console.log('MySQL Connected');
});

//Export connection
module.exports = dbConnection;