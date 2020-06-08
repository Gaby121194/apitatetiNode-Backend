var express = require('express');
var router = express.Router();
var redis= require('redis').createClient()

/* GET home page. */
router.get('/:nombre',function(req,res){
    redis.hgetall(`user#${req.params.nombre}`, (err,result)=>res.json({
        status:200,
        response: result
    })
        
    )
})

router.post('/new', function(req, res, next) {
    userName = req.body.name
    redis.hgetall(`user#${userName}`, (err, result)=> {
    if(result){
        res.json({
            status:400,
            response: "el usuario ya existe"
        })
    }
    else{
        let token = "autorizacion" + Math.random()
        let userID = Math.random()
        let user = {
            user: userID,
            token: token,
            name: userName
        }
        let authorization = {
            token: token,
            user: token
        }
        
        redis.hmset(`user#${userName}`, "usuario", JSON.stringify(user), (err,result)=>{
            
            if(result) {
                redis.hmset(`authorization#${token}`, "authorization", JSON.stringify(authorization), (err,result)=>{
                    if(result){
                        res.json({
                            status:200,
                            response: token
                        })
                    }
                    else {
                        res.json({
                            status:400,
                            response: err
                        })
                    }
                } )
            }
            else {
                res.json({
                    status:400,
                    response: "no se pudo crear cliente"
                })
            }
        })
        
        
    }
})
    
});

module.exports = router;