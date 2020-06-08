var express = require('express');
var router = express.Router();
var redis= require('redis').createClient()
var Plan = require('./Plan.js')
var winner = require('./winner.js')


/* GET users listing. */

router.get("/", function(req,res){

    res.send(req.headers["authorization"])

})



router.get("/:idBoard", function(req,res) {
        let idBoard= req.params.idBoard
        redis.hget(`board#${idBoard}`, "tateti" , (error,result)=>{
            if(result){
                res.json({
                    status:200,
                    response: JSON.parse(result)
                })
            }
            else{
                res.json({
                    status:400,
                    response: "No existe la tabla"
                }
                )
            }
        })
    })


router.post("/create", async function(req,res){
       let authorization = req.headers['authorization']
        if(!authorization){
            res.json({
                status:400,
                response: "no tiene autorizacion"
            })
        }

        autorizacion = await Plan.autorizar(authorization)

        if(autorizacion.status == 200) {
                let idBoard = "board"+ (Math.random()*1000)
                let table = {
                    idTable: idBoard,
                    cuadro1: null,
                    cuadro2: null,
                    cuadro3: null,
                    cuadro4: null,
                    cuadro5: null,
                    cuadro6: null,
                    cuadro7: null,
                    cuadro8: null,
                    cuadro9: null,
                    player1: JSON.parse(autorizacion.response).user,
                    player2: "",
                    stateCreation: "incomplete",
                    stateGame: "",
                    currentPlayer: null,
                    turnos: 0,
                }
                
                //guardado de la tabla creada con promesas

                let board = JSON.stringify(table)

                result = await Plan.saveTable(idBoard ,board)
                
                if(result.status == 200) {
                    res.json(result)
                }
                else {
                    res.json(result)
                }


            }else {
                res.json(autorizacion)
            }
        
            })

router.put("/join/:idBoard", async function(req,res){
    let idBoard = req.params.idBoard
    let authorization = req.headers['authorization']
    if(!authorization){
        res.json({
            status:400,
            response: "no tiene autorizacion"
        })
    }

    autorizacion = await Plan.autorizar(authorization)
        if (autorizacion.status == 200) {
            let idPlayer2 = JSON.parse(autorizacion.response).user

            result = await Plan.getTable(idBoard)

                if(result.status == 200) {
                    let table = result.response 
                    if(table.stateCreation == "incomplete"){
                        
                        table["stateCreation"] = "complete"
                        table["player2"] = idPlayer2
                        if(Math.random() > 0.5){
                            table["currentPlayer"] = true
                        }
                        else{
                            table["currentPlayer"] = false
                        }
                        
                        table.stateGame = "playing"
                        board = JSON.stringify(table)

                        result = await Plan.saveTable(idBoard, board)

                        if (result.status == 200) {
                            res.json(result)
                        }
                        else {
                            res.json(result)
                        }
                       
                    }
                    else {
                        res.json({
                            status:400,
                            response: 'la sala ya esta completa'
                        })
                    }
                }
                else {
                    res.json(result)
                }
                    
                
        }
        else {
            res.json(autorizacion)
        }
    
    


})

router.put("/mark/:idBoard", async function(req,res){
    let authorization = req.headers['authorization']
    if(!authorization){
        res.json({
            status:400,
            response: "no tiene autorizacion"
        })
    }
    autorizacion = await Plan.autorizar(authorization)
    
        if (autorizacion.status == 200){
            let idBoard = req.params.idBoard
            let idJugador = JSON.parse(autorizacion.response).user

            result = await Plan.getTable(idBoard)
            if(result.status == 200){
                let table = result.response
                
                let position = req.body.position
                
                if(table.stateGame == "playing"){
                    if(table.player1 == idJugador || table.player2 == idJugador){
                        
                        if(table.player1 == idJugador && table.currentPlayer == true){
                            
                            if(table[`cuadro${position}`] == null){
                                table[`cuadro${position}`] = "X"
                                table.currentPlayer = false
                                table.turnos = table.turnos + 1
                                if(table.turnos == 9){
                                    table.stateGame = "empatado"
                                }
                                if( winner.win(position, table) ){
                                    table.stateGame = "ganada"
                                }
                                let board = JSON.stringify(table)
                                result = await Plan.saveTable(idBoard, board)
                                if(result.status == 200){
                                    res.json(result)
                                }
                                else{
                                    res.json(result)
                                }
                            }else{res.json({status:400,response: "esta ocupada la marca"})}
                        }else if(table.player2 == idJugador && table.currentPlayer == false){
                            if(table[`cuadro${position}`] == null){
                                table[`cuadro${position}`] = "O"
                                table.currentPlayer = true
                                table.turnos = table.turnos + 1
                                if(table.turnos == 9){
                                    table.stateGame = "empatado"
                                }
                                if( winner.win(position,table) ){
                                    table.stateGame = "ganada"
                                }
                                let board = JSON.stringify(table)
                                result = await Plan.saveTable(idBoard, board)
                                if(result.status == 200){
                                    res.json(result)
                                }
                                else{
                                    res.json(result)
                                }
                            }else{res.json({status:400,response: "esta ocupada la marca"})}
                        }
                        else{res.json({status:400,response:"no es tu turno"})}
                        
                    }else{
                        res.json({status:400,response: "no sos un jugador permitido"})
                    }
                }else{res.json({status:400,response:"el juego ya finalizo"})}
            }else{ res.json(result)}

        }else {
            res.json(autorizacion)
        }
        
    


    
})
    

module.exports = router;
