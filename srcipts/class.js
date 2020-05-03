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
        this.result = eval(this.line);
        console.log("Linea: "+this.line+" = "+this.result);
        return this.result;
    }

    // Metodo de reseteo
    this.delete = function(){
        this.line="";
    }

    // Metodo de borrado
    this.back = function(){
        this.line = this.line.slice(0,this.line.length-1);
    }

    // Metodos de memoria
    this.sumMemory = function(n){
        this.setMemory(Number(n)+this.getMemory());
        console.log("Memoria: "+this.getMemory());
    }
    this.restMemory = function(n){
        this.setMemory(Number(n)-this.getMemory());
        console.log("Memoria: "+this.getMemory());
    }
}