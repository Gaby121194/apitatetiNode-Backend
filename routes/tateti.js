var express = require('express');
var router = express.Router();
var redis= require('redis').createClient()

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.send('Esto es la pagina del tateti');
});



router.get("/partida/:idTabla", function(req,res) {
        let id= req.params.idTabla
        redis.hget(`tabla#${id}`, "tateti" , (error,result)=>{
            if(result){
                res.json({
                    status:200,
                    response: JSON.parse(result)
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
        let jugador = req.body.idJugador
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
                jugador1: jugador,
                jugador2: "",
                juegoNuevo: false,
                estado: "incompleta",
                currentPlayer: ""
            }
        
    let id = req.body.id
   
    
    let tabla = JSON.stringify(tateti)
    redis.hmset(`tabla#${id}`, "tateti" , tabla ,(err,result)=> {
        if(result) {
            res.json({
                status:200,
                response: JSON.parse(tabla),
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

router.put("/unirPartida/:idTabla", function(req,res){
    let idtabla = req.params.idTabla
    redis.hget(`tabla#${idtabla}`, 'tateti', (err,result)=> {
    if(result) {
        let tateti = JSON.parse(result)
        if(tateti.estado == "incompleta"){
            tateti = JSON.parse(result)
            tateti["estado"]= "completa"
            tateti["jugador2"] = req.body.jugador2
            tateti["currentPlayer"] = req.body.currentPlayer
            tabla = JSON.stringify(tateti)

            redis.hmset(`tabla#${idtabla}`, 'tateti',  tabla ,(err,result)=> {
                if(result){
                res.json({
                    status:200,
                    response: JSON.parse(tabla)
                })
            }
                else{
                    res.json({
                        status:403,
                        response: 'error al unirte a la partida'
                    })
                }
            })
        }
        else {
            res.json({
                status:400,
                response: 'la sala ya esta completa'
            })
        }
    }
    else {
        res.json({
            status:400,
            response: 'no existe el juego'
        })
    }
        
    })

})


router.put("/ponerMarca/:idTabla/:idJugador", function(req,res){
    let id = req.params.idTabla
    let marca = req.body.posicion
    let idJugador = req.params.idJugador
    redis.hget(`tabla#${id}`, "tateti", (err,result)=>{
        if (result) {
            let tateti = JSON.parse(result)
            if (tateti.jugador1 == idJugador || tateti.jugador2 == idJugador) {
                
                if (tateti.currentPlayer == idJugador) {
                    tateti[`cuadro${marca}`] = "X"
                    tateti.currentPlayer = tateti.jugador2

                }
                else {
                    tateti[`cuadro${marca}`] = "O"
                    tateti.currentPlayer = tateti.jugador1
                }

                let tabla = JSON.stringify(tateti)

                redis.hmset(`tabla#${id}`, "tateti", tabla, (err, result) => {
                    if (result) {
                        res.json({
                            status: 200,
                            response: JSON.parse(tabla)
                        })
                    }
                    else {
                        res.json({
                            status: 400,
                            response: "no se pudo poner la marca"
                        })
                    }
                }


                )

            }
            else {
                res.json({
                    status:400,
                    response: "no es un jugador permitido"
                })
            }
        }

        else {
            res.json({
                status: 400,
                response: "no existe el juego"
            })
        }
    })
})
module.exports = router;
