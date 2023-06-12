const express= require("express");
const jwt=require("jsonwebtoken");
require("dotenv").config()
const app=express();

app.use(express.json());
const posts=[
    {
        username:"Harsh",
        title:"post 1"
    },
    {
        username:"Kelish",
        title:"post 2"
    }
]
app.get("/posts",autheticateToken,(req,res)=>{
    
    res.json(posts.filter(post=> post.username=== req.user.name));

})

app.post("/login",(req,res)=>{
    const username=req.body.username;
    const user={name:username}
    const access_token=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
    res.json(access_token);
})

function autheticateToken(req,res,next){
    const authHeader=req.headers["authorization"];
    const token=authHeader && authHeader.split(" ")[1]
    if(token== null) return res.sendStatus(401)
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403)
        req.user=user;
        next()
    })
}

app.listen("3000",()=>{
console.log("server started");
})