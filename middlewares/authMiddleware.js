const jwt=require('jsonwebtoken');
const config=require('../config');

module.exports = function(req,res,next){

    if(!req.headers){
        return res.status(401).send({auth:false,message:"No token provided"})
    }
    var token=req.headers['x-access-token'];
    if(!token){
        return res.status(401).send({auth:false,message:"No token provided"});
    }
    jwt.verify(token, config.secret, function(err,decoded){
        if(err){
            return res.status(500).send({auth:false,message:"Failed to authencate token."});
        }
        next();
    });
 } 