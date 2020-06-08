function win (position,table) {
  console.log(position)
    switch (position) {
      
        case "1" : {
          
          if ((table.cuadro1 == table.cuadro2 && table.cuadro1 == table.cuadro3) || (table.cuadro1 == table.cuadro4 && table.cuadro1== table.cuadro7) || (table.cuadro1 == table.cuadro5 && table.cuadro1== table.cuadro9))  {
            
            return true;
          }
    
          break
    
        }
    
        case "2": {
    
    
          if ((table.cuadro2 == table.cuadro1 && table.cuadro2== table.cuadro3) || (table.cuadro2 == table.cuadro5 && table.cuadro2== table.cuadro8)) {
    
            return true;
          }
    
          break
        }
    
    
        case "3": {
    
    
    
          if ((table.cuadro3 == table.cuadro2 && table.cuadro3==table.cuadro1) ||(table.cuadro3 == table.cuadro6 && table.cuadro3==table.cuadro9) || (table.cuadro3 == table.cuadro5 && table.cuadro3== table.cuadro7)) {
    
            return true;
          }
    
          break
        }
    
        case "4": {
    
    
    
          if ((table.cuadro4 == table.cuadro5 && table.cuadro4== table.cuadro6) || (table.cuadro4 == table.cuadro1 && table.cuadro4== table.cuadro7) ) {
    
            return true;
          }
    
          break
    
        }
        case "5": {
    
    
    
          if ((table.cuadro5 == table.cuadro2 && table.cuadro5== table.cuadro8) || (table.cuadro5 == table.cuadro4 && table.cuadro5== table.cuadro6) || (table.cuadro5 == table.cuadro3  && table.cuadro5== table.cuadro7) || (table.cuadro5 == table.cuadro1 && table.cuadro5== table.cuadro9)) {
    
            return true;
          }
    
          break
        }
    
        case "6": {
    
    
    
          if ((table.cuadro6 == table.cuadro5 && table.cuadro6== table.cuadro4) || (table.cuadro6 == table.cuadro3 && table.cuadro6== table.cuadro9) ) {
    
            return true;
          }
    
          break
    
        }
        case "7": {
    
    
    
          if ((table.cuadro7 == table.cuadro4 && table.cuadro7== table.cuadro1) || (table.cuadro7 == table.cuadro8 && table.cuadro7== table.cuadro9) || (table.cuadro7 == table.cuadro5 && table.cuadro7== table.cuadro3)) {
    
            return true;
          }
    
          break
        }
    
        case "8": {
    
    
    
          if ((table.cuadro8 == table.cuadro7 && table.cuadro8== table.cuadro9) || (table.cuadro8 == table.cuadro5 && table.cuadro8== table.cuadro2)) {
    
            return true;
          }
    
          break
    
        }
        case "9": {
    
          if ((table.cuadro9 == table.cuadro8 && table.cuadro9== table.cuadro7) || (table.cuadro9 == table.cuadro6 && table.cuadro9== table.cuadro3) || (table.cuadro9 == table.cuadro5 && table.cuadro9== table.cuadro1) ) {
    
            return true;
          }
    
          break
        }
    
        
    
    
      
      }
    
}

module.exports = { win}