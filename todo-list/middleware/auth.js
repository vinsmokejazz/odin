const jwt=require("jsonwebtoken");

const{JWT_USER_PASSWORD}=require("../config");

function auth(req,res,next){
  const token=req.headers.authorization;

  try{
    const decoded=jwt.verify(token,JWT_USER_PASSWORD);
    req.userId=decoded.id;
    next();
  }catch(error){
    return res.status(403).json({
      message:"not signed in",
    });
  }
}

module.exports={
  auth,
}