/**
 * Clase Calculadora
 */
function Calculator(){
    this.line="";
    this.memory = 0;
    
    // Metodos getter y setter
    this.setLine = function(n){
       this.line = n;
    }
    this.getLine = function(){
       return this.line;
    }
    this.addLine = function(add){
        this.line += add;
    }
    this.setMemory = function (m){
        this.memory = Number(m);
    }
    this.getMemory = function(){
        return this.memory;
    }

    // Metodo de calculo
    this.resultCalcu = function(){
        var result;
        try{
            result = eval(this.getLine());
            console.log("Linea: "+this.getLine()+" = "+result);
        }
        catch (EvalError){
            result = "Syntax ERROR";
        }
        return result;
    }

    // Metodo de reseteo
    this.delete = function(){
        this.setLine("");
    }

    // Metodo de borrado
    this.back = function(){
        this.setLine(this.getLine().slice(0,this.getLine().length-1));
    }

    // Metodos de memoria
    this.sumMemory = function(n){
        this.setMemory(Number(n)+this.getMemory());
        console.log("Memoria: "+this.getMemory());
    }
    this.restMemory = function(n){
        this.setMemory(this.getMemory()-Number(n));
        console.log("Memoria: "+this.getMemory());
    }
}