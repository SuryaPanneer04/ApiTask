const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
// const bycrpt = require('bcrypt');
const app =express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host : "localhost",
    user: "root",
    password: "",
    database:"signup"
})

app.post('/signup',(req,res) =>{
   const sql = "INSERT INTO login (`name`,`email`,`password`,`role`) VALUES (?)";
   const values =[
    req.body.name,
    req.body.email,
    req.body.password,
    req.body.role
    ]
    
    db.query(sql, [values],(err, data) => {
        if(err){
             return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/login',(req,res) =>{
    const sql = "Select * from  login where `email`= ? and `password`= ? and `role`= ? "; 
     db.query(sql , [ req.body.email,req.body.password,req.body.role],(err,data) =>{
         if(err){
              return res.json("Error");
         }
         if(data.length>0){
            return res.json("Success");
         }else{
            return res.json("failed");
         }
     })
 })


app.listen(8081,()=>{
    console.log("listern ");
})