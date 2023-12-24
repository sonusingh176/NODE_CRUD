const express = require("express");
const app =express();
const User = require('./database');



app.set("view engine","ejs");

app.use(express.urlencoded({extended:false}));

app.get("/",async(req,res)=>{
    const users = await User.find({});
    res.render("index",{
        title:"title",
        users:users
    })
})


app.post("/register",async(req,res)=>{
    const {name,email,password}= req.body;
    const newuser=new User({name,email,password});
    const usersave= await newuser.save();
    res.redirect("/")

})


app.get("/register",(req,res)=>{
    res.render("register");

})

app.get("/edit/:id" ,async(req,res)=>{
    const {id} =req.params;
    const user =await User.findById({_id:id});
    if(user==null){
        res.redirect("/")
    }else{
        res.render("edit",{
            user:user

        })
    }
})

app.listen(3000, ()=>{
    console.log("server listen on port + 3000" )
})
