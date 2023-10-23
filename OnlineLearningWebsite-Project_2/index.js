const exp = require('constants');
const express= require('express');
const app=express();
const Datastore= require('nedb');
app.listen(3000,()=>{console.log("app is listening")});
app.use(express.static('public'));

app.use(express.json({limit:'1mb'}));

const databaseUser=new Datastore('UserDatabase.db');
databaseUser.loadDatabase(); 
const databaseBlog=new Datastore('BlogDatabase.db');
databaseBlog.loadDatabase();

const databaseQuiz=new Datastore('QuizDatabase.db');
databaseQuiz.loadDatabase();

const databaseCourseCompleted=new Datastore('CourseCompletedDatabase.db');
databaseCourseCompleted.loadDatabase();

const databaseCourseEnroll=new Datastore('CourseEnrollDatabase.db');
databaseCourseEnroll.loadDatabase();

app.post('/api5',(req,res)=>{
    console.log('api5 is running');
    databaseCourseEnroll.insert(req.body);
        // databaseCourseEnroll.remove(courseEnrollID="xYlCJTa");
    console.log(req.body);
    res.json({
        status: 'successful api5',
    });
    
});
app.get('/api5',(req,res)=>{
    databaseCourseEnroll.find({},(err,data)=>{
        if(err){
            res.end();
            return;
        }
        res.json(data);
    })
});





app.post('/api4',(req,res)=>{
    console.log('api4 is running');
    databaseCourseCompleted.insert(req.body);
    console.log(req.body);
    res.json({
        status: 'successful api4',
    });
});
app.get('/api4',(req,res)=>{
    databaseCourseCompleted.find({},(err,data)=>{
        if(err){
            res.end();
            return;
        }
        console.log("connect");
        console.log(data);
        res.json(data);
    })
});







app.post('/api3',(req,res)=>{
    console.log('api3 is running');
    databaseQuiz.insert(req.body);
    console.log(req.body);
    res.json({
        status: 'successful api3',
    });
});
app.get('/api3',(req,res)=>{
    databaseQuiz.find({},(err,data)=>{
        if(err){
            res.end();
            return;
        }
        res.json(data);
    })
});


app.post('/api2',(req,res)=>{
    databaseBlog.insert(req.body);
    console.log("api2 running");
    console.log(req.body);
    res.json({
        status:'successful api2',

    });
});
app.get('/api2',(req,res)=>{
    databaseBlog.find({},(err,data)=>{
        if(err){
            res.end();
            return;
        }
        res.json(data);
    })
});

app.post('/api',(req,res)=>{
    console.log("i got req");
    console.log(req.body);
    databaseUser.insert(req.body);
    console.log("inserted");
    res.json({
        status:'successful',
    })
});

app.get('/api',(req,res)=>{
    databaseUser.find({},(err,data)=>{
        if(err){
            res.end();
            return;
        }
        res.json(data);
    })
})