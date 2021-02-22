const express = require('express');
const mysql = require('mysql');

//Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todoapp',    
});

//Connect to MySQL
db.connect(err => {
    if(err){
        return console.error('error: ' + err.message);
    }
    console.log('MySQL Connected');
})

//Export express
const app = express();

//create database
app.get('/createdb',(req, res) => {
    let sql = 'CREATE DATABASE [IF NOT EXISTS] todoapp'
    db.query(sql, err => {
        if(err){
            throw err;
        }
        res.send("Database Created");
    });
});

//Create a table
app.get('/createtask', (req,res) => {
    let sql = 'CREATE TABLE tasks(id int AUTO_INCREMENT, task VARCHAR(255), status VARCHAR(255), PRIMARY KEY(id))'
    db.query(sql, err => {
        if(err){
            throw err;
        }
        res.send('Task table created')
    });
});

//Insert task
app.get('/task/:task-:status', (req,res) => {  
    let post = {task: `${req.params.task}`, status: `${req.params.status}`};
    let sql = 'INSERT INTO tasks SET ?';
    let query = db.query(sql, post, err =>{
        if(err){
            throw err;
        }
        res.send('Task added');
    });
});

//Select task
app.get('/gettask', (req,res) =>{
    let sql = 'SELECT * FROM tasks';
    let query = db.query(sql,(err, results) =>{
        if(err){
            throw err;
        }
        console.log(results);
        res.send('Task details fetched');
    });
});

/*//Update task
app.get('/updatetask/:id', (req, res) => {
    let newStatus = 'done';
    let sql = `UPDATE tasks SET status = '${newStatus}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, err => {
        if(err){
            return console.error('error: ' + err.message);
        }
        res.send('Task updated');
    });
});*/


//Update task
app.get('/updatetask/:id-:status', (req, res) => {
    let sql = `UPDATE tasks SET status = '${req.params.status}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, err => {
        if(err){
            throw err;
        }
        res.send(`Task ${req.params.id} updated`);
    })
})


//Delete task
app.get('/deletetask/:id', (req, res) => {
    let sql = `DELETE FROM tasks WHERE id = ${req.params.id}`;
    let query = db.query(sql, err => {
        if(err){
            throw err;
        }
        res.send('Task deleted');
    })
})



app.listen('3000', () => {
    console.log('Server started on port 3000');
});


