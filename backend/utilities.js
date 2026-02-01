const jwt=require('jsonwebtoken');
function authenticateToken(req,res,next){
    function getToken(req){
        if(req.headers.authorization && req.headers.authorization.split(" ")[0]==="Bearer"){
            return req.headers.authorization.split(" ")[1];

        }
        return null;
        
    }
const token=getToken(req);
    if(!token) return res.sendStatus(400);

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(401);
        req.user=user;
        next();
    });
}
    module.exports={
authenticateToken
    }


