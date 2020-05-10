/**
 * Clase Calculadora
 * @author Guillermo Casas Reche
 * @author guillermo.casas@campusfp.es
 * @version 1.0
 */
function Calculator(){
    // ATRIBUTOS
    this.line="";
    this.memory = 0;
    
    // METODOS GETTER Y SETTER
    this.setLine = function(n){
       this.line = n;
    }
    this.getLine = function(){
       return this.line;
    }
    this.setMemory = function (m){
        this.memory = Number(m);
    }
    this.getMemory = function(){
        return this.memory;
    }

// =======================================================
// ================ METODOS PROPIOS ======================
// =======================================================
    /**
     * Funcion para añadir un nuevo caracter a la linea de operacion (obj.line)
     */
    this.addLine = function(add){
        this.line += add;
    }

    /**
     * Metodo para calcular el resultado de la linea de operacion (obj.line)
     * Si se produce algun error en el calculo, devolvera un String con un mensaje de error
     * @returns {*} Resultado del calculo
     */
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

    /**
     * Metodo para limpiar la linea de operación (line)
     */
    this.delete = function(){
        this.setLine("");
    }

    /**
     * Metodo para eliminar n caracteres de la linea de operacion (derecha a izquierda)
     * @param {number} n Numero de caracteres a eliminar (por defecto 1)
     */
    this.back = function(n=1){
        this.setLine(this.getLine().slice(0,this.getLine().length-n));
    }

    // METODOS DE MEMORIA
    /**
     * Metodo para sumar un numero al valor de memoria (obj.memory)
     * @param {number} n Numero a sumar
     */
    this.sumMemory = function(n){
        this.setMemory(Number(n)+this.getMemory());
        console.log("Memoria: "+this.getMemory());
    }
    /**
     * Metodo para restar un numero al valor de memoria (obj.memory)
     * memory - resta
     * @param {number} n Numero a restar
     */
    this.restMemory = function(n){
        this.setMemory(this.getMemory()-Number(n));
        console.log("Memoria: "+this.getMemory());
    }
}