const jwt=require("jsonwebtoken")
require("dotenv").config()

const tokenGenerator= async (email)=> {
    try{
       const token=jwt.sign({email},process.env.JWT_KEY,{expiresIn:'3h'})
       return token
    }
    catch(error){
       return error
    }
}
const tokenValidator= async (req,res,next)=>{


    // try{
    //      console.log(token,process.env.JWT_KEY)
    //      const data=jwt.verify(token,process.env.JWT_KEY)
    //      req.user=data
    //      console.log(data)
    //  }
    //  catch(error){
    //      return error
    //  }
//     const jwt = require('jsonwebtoken');

// function tokenValidator(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token,process.env.JWT_KEY);
        console.log(decoded," :: decoded")
        req.data = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token', details: error.message });
    }
}

    

module.exports.tokenGenerator=tokenGenerator;
module.exports.tokenValidator=tokenValidator;