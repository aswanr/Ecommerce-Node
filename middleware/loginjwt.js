const jwt=require('jsonwebtoken');

const userauth=(request,response,next)=>{
    
    const authheader=request.headers.authorization;
    if(!authheader || !authheader.startsWith('Bearer ')){
        return response.status(401).json({message:"user not found"})
    }
    else{
        const token=authheader.split(' ')[1];
        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET_KEY);
            return next();
        }catch(err){
            response.status(404).json({message:"unautherized token"});
        }
    }
}
const adminauth=(request,response,next)=>{
    const authheader= request.headers.authorization;
    if(!authheader || !authheader.startsWith('Bearer ')){
        return response.status(401).json({message:"user not found"})
    }
    else{
        const token=authheader.split(' ')[1];
        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET_KEY);
            return next();
        }
        catch(err){
            response.status(404).json({message:"unautherized token"});
        }
    }
}
module.exports = {userauth , adminauth};