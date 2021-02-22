/*----- Init ---------------------------*/

const express = require('express');
//const mysql = require('mysql');
const tools = require('../public/javascripts/tools');
const dbConnection = require('../config/dbConnection');

//Export router
const dbRouter = express.Router();

//Create database
dbRouter.get('/',(req, res) => {
    let sql = 'CREATE DATABASE mindfulnessapp'
    dbConnection.query(sql, err => {
        if(err){
            throw err;
        }
        res.send("Database Created");
    });
});

//Create tables
dbRouter.get('/createtables', (req,res) => {  
    //Table questions
    let sql = 'CREATE TABLE IF NOT EXISTS questions(id int, question VARCHAR(1000), PRIMARY KEY(id))'
    dbConnection.query(sql, err => {
        if(err){
            throw err;
        }        
    });
    //Table users
    sql = 'CREATE TABLE IF NOT EXISTS users(id int AUTO_INCREMENT, googleId double, givenName VARCHAR(255), familyName VARCHAR(255), PRIMARY KEY(id))'
    dbConnection.query(sql, err => {
        if(err){
            throw err;
        }        
    });
    //Table answers
    sql = 'CREATE TABLE IF NOT EXISTS answers(idUser int, idQues int, idAns int AUTO_INCREMENT, answer VARCHAR(2000), usedTime VARCHAR(255), ansDate VARCHAR(255), PRIMARY KEY(idAns))'
    dbConnection.query(sql, err => {
        if(err){
            throw err;
        }
        res.send('All three tables created')
    });    
});


/*-------- Admin Functions ---------------------*/

//Questions
let questions = [
    [0, '¿Cómo estas?, realmente'],
    [1, '¿Qué te gustaría estar haciendo ahora mismo?'],
    [2, '¿Qué te gustaría cenar esta noche?'],
    [3,'¿A quién le agradecerias hoy por su compañia o ayuda?']
];

//Variables
//let user0 = 0;
let startTime;
let time0 = 15;
let questionsIdArray = [];
let currentQuestionId;
let questionObjArr = [];


//Insert Questions
/* TBA functionality to avoid inserting duplicate questions*/
dbRouter.get('/insert/questions', (req,res) => {      
    let sql = 'INSERT INTO questions (id, question) VALUES ?';
    let query = dbConnection.query(sql, [questions], err =>{
        if(err){
            throw err;
        }
        res.send('Questions added');
    });
});


// Retrieve all questions id
dbRouter.get('/questionspage', (req, res) => {
    let sql = 'SELECT id FROM questions';
    let query = dbConnection.query(sql,(err, results) =>{
        if(err){
            throw err;
        }
        //console.log(results);
        //Save all ids in an array
        questionsIdArray.length = 0; //reset array
        results.forEach(element => {
            questionsIdArray.push(element.id);
        });
        //Shuffle the id array
        tools.shuffleArray(questionsIdArray);
        //console.log(questionsIdArray);       
        //res.send('All questions ids retrieved');
        //Redirect to question page to render next question        
        res.redirect('/db/nextquestion');
    });
});



/*--------- User functions -----------*/



//Render question page
dbRouter.get('/nextquestion', (req,res) =>{
    //Get answering starting time
    startTime = Date.now();            

    let sql = 'SELECT * FROM questions';
    let query = dbConnection.query(sql,(err, results) =>{
        if(err){
            throw err;
        }
        //console.log(results);
        //console.log(questionsIdArray);

        if (questionsIdArray.length){
            //Retrieve first question id and remove it from id array
            [currentQuestionId, questionsIdArray] = tools.questionTracker(questionsIdArray);
        
            //Render the question
            res.render('questions', { questionTitle: `${results[currentQuestionId].question}`, url: req.originalUrl});
        }
        else {
            //Redirect to the results page        
            res.redirect('/db/results');
        }
               
    });
});

//Submit answer
dbRouter.post('/submitans', (req,res) => {
    //Get answering ending time
    let endTime = Date.now();
    //Get formatted spent time answering
    let spentTime = tools.FormattedTime(Math.ceil((endTime - startTime)/1000));     
    console.log('Spent time: ' + spentTime);

    //Get formatted today's day
    let todayDate = tools.getFormattedDate();    

    const ansBody = req.body.answer;       

    let post = {
        idUser: req.user.id,
        idQues: currentQuestionId, 
        answer: ansBody,   
        usedTime: spentTime,
        ansDate: todayDate
    };   

    let sql = 'INSERT INTO answers SET ?';
    let query = dbConnection.query(sql, post, err =>{
        if(err){
            throw err;
        }          
        //Redirect to question page to render next question        
        res.redirect('http://localhost:3000/db/nextquestion');      
    });   
});


//Render results page
dbRouter.get('/results', (req, res) => {
    //Reset array
    questionObjArr.length = 0;    
    //Retrieve all questions
    let sql = 'SELECT * FROM questions';
    let query = dbConnection.query(sql, (err, results) => {
        if(err){
            throw err;
        } 
        //Convert into an array of objects       
        results.forEach(element =>{
            questionObjArr.push({
                id: element.id,
                qWording: element.question,
                answerObjArr: []
            });            
        });
        //console.log(questionObjArr);        
    });    
    //Retrieve all answers of actual user
    sql = `SELECT * FROM answers WHERE idUser = ${req.user.id}`;
    query = dbConnection.query(sql, (err, results) => {
        if(err){
            throw err;
        }  
        //Insert answers into the corresponding position in the array of objects
        results.forEach(element =>{
            questionObjArr[element.idQues].answerObjArr.push({
                idUser: element.idUser,
                idQues: element.idQues,
                idAns: element.idAns,
                ansWording: element.answer,
                usedTime: element.usedTime,
                ansDate: element.ansDate                
            })
        })
        console.log(questionObjArr);        
        res.render('results', {posts: questionObjArr, url: req.originalUrl});
    });       
});

//Export database router
module.exports = dbRouter;


