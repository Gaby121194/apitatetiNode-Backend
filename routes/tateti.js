var express = require('express');
var router = express.Router();
var redis= require('redis').createClient()

/* GET users listing. */
router.post("/jugador", function(req,res){
    let id= req.body.idJugador
    redis.hmset(`jugador${id}`, req.body, (err,result)=> {
        if(result) {
            res.json({
                status:200,
                response: result,
            })
            
        }
        else {
            res.json({
                status:400,
                response: "no se pudo crear el jugador"
            })
        }

    }
    )

})

router.get("/jugador/:idJugador", function(req,res){
    let id= req.params.idJugador
    redis.hgetall(`jugador${id}`, (err,result)=> {
        if(result) {
            res.json({
                status:200,
                response: result
            })
            
        }
        else {
            res.json(
                {
                    status:400,
                    response: "no hay jugador"
                }
            )
        }

    }
    )

})

router.get('/', function(req, res, next) {
  res.send('Esto es la pagina del tateti');
});



router.get("/partida/:idTabla", function(req,res) {
        let id= req.params.idTabla
        redis.hgetall(`tabla#${id}`, (error,result)=>{
            if(result){
                res.json({
                    status:200,
                    response: result
                })
            }
            else{
                res.json({
                    status:400,
                    response: "nada"
                }
                )
            }
        })
    })

router.post("/crearpartida", function(req,res){
    
    if(req.body.juegoNuevo == "true"){
        let tateti = {
                cuadro1: null,
                cuadro2: null,
                cuadro3: null,
                cuadro4: null,
                cuadro5: null,
                cuadro6: null,
                cuadro7: null,
                cuadro8: null,
                cuadro9: null,
            }
        
    let id = req.body.id
    
    let tabla = JSON.stringify(tateti)
    redis.hmset(`tabla#${id}`, "tateti" , tabla ,(err,result)=> {
        if(result) {
            res.json({
                status:200,
                response: result,
            })
            
        }
        else {
            res.json({
                status:400,
                response: "no se pudo crear el juego"
            })
        }

    }
    )
}


})

router.put("/ponerMarca/:idTabla/:idPosicion", function(req,res){
    let id = req.params.idTabla
    let marca = req.params.idPosicion
    redis.hget(`tabla#${id}`, "tateti", (err,result)=>{
       if(result){
            
            tateti = JSON.parse(result)
            tateti.cuadro2 = "X"
            tabla = JSON.stringify(tateti)
            redis.hmset(`tabla#${id}`, "tateti", tabla, (err,result)=>{
                if(result){
                    res.json({
                        status:200,
                        response: tabla
                    })
                }
                else {
                    res.json({
                        status:400,
                        response: "no se pudo poner la marca"
                    })
                }
            })

       }
       else {
           res.json({
               status:400,
               response: "no existe el juego"
           })
       } 
    })
}

      )
module.exports = router;
