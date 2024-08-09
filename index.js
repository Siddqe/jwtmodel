const express=require("express");
const mongoose=require("mongoose");
const Logi=require('./models/login.js');
const {hashGenerator}=require('./helper/hashing.js');
const {hashValidate}=require('./helper/hashing.js');
const {tokenGenerator}=require('./helper/token.js');
const {tokenValidator}=require('./helper/token.js')
require("dotenv").config();
const app=express();


app.use(express.json());


app.post('/userdetials',async (req,res) =>{
    try{
    const {name,email,password,userrole}=(req.body);
    
    const hashPassword=await hashGenerator(password)

    const user=new Logi ({
      name:name,
      email:email,
      password:hashPassword,
      userrole:userrole

    })
    const saveUser= await user.save();
    res.status(200).json(saveUser)
}
catch(error){
    res.status(500).json({message:error.message})
}
});

app.post('/signin',async (req,res) => {
  try{
    const {name,email,password}=(req.body);

    console.log(email)
     const existingUSer=await Logi.findOne({email:email});
     if(!existingUSer){
      res.status(404).json({message:"not found the user"})
     }
     const checkUser=await hashValidate(password,existingUSer.password)
      if(!checkUser){
        return res.json({message:"password is invalide"})
      }
      const token= await tokenGenerator(existingUSer.userrole   )
     
      res.json({token:token})
    }
    catch(error){
      res.status(500).json({message:error.message})
    }
})

app.get('/protected',tokenValidator,(req,res) =>{
  try{
    console.log(req.data)
    res.status(200).json({message:"successfully protected",data:req.data})
    
  }
  catch(error){
    res.status(500)
  }
  
})





mongoose.connect('mongodb://localhost:27017/login',{useNewUrlParser:true,useUnifiedTopology:true})
.then( () => {
      console.log("database connected")
      app.listen(5000)
      console.log("successfully connected")
})
.catch((error) => {
     console.error("unable to connect",error.message)
})
