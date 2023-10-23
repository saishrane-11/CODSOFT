const express=require('express');
const app=express();
app.listen(3000,()=>console.log('app is listening'));
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));
const Datastore=require('nedb');
const database=new Datastore('database.db');
database.loadDatabase();

const databaseBlog=new Datastore('BlogDatabase.db');
databaseBlog.loadDatabase();

app.post('/api',(req,res)=>{
    console.log("i got req");
    database.insert(req.body);
    console.log(req.body);
    res.json({
        status: 'successful',
    })
    
})
app.get('/api',(req,res)=>{
    database.find({},(err,data)=>{
        if(err){
            res.end();
            return;
        }
        res.json(data);
    })
})

app.post('/api2',(req,res)=>{
    if(req.body.c2==1){
        console.log("c2c2");
        
    }else{
        databaseBlog.insert(req.body);
        console.log("nono");
    }
    
    console.log("api2 running");
    console.log(req.body);
    id=req.body.id;
    res.json({
        status:'successful api2',

    });
    console.log("uid: "+req.body.uid);
    console.log("comment: "+req.body.comment);
    databaseBlog.update(
        { _id: req.body.uid }, 
        { $set: {comment:[req.body.comment]} },
        {},// this argument was missing
        function (err, numReplaced) {
          console.log("replaced---->" + numReplaced);
        }
    );
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
