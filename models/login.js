const mongoose=require("mongoose");
const loginSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    userrole:{
       type:String,
       enum:['student','admin'],
       default:'student'
    }
})

const login=mongoose.model("users",loginSchema);
module.exports=login;
