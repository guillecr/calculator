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
// ================ MÉTODOS PROPIOS ======================
// =======================================================
    /**
     * Función para añadir un nuevo caracter a la línea de operación (obj.line)
     * @param {String} add Caracter a añadir
     */
    this.addLine = function(add){
        this.line += add;
    }

    /**
     * Método para calcular el resultado de la línea de operación (obj.line)
     * Si se produce algún error en el cálculo, devolverá un String con un mensaje de error
     * @returns {*} Resultado del cálculo
     */
    this.resultCalcu = function(){
        var result;
        try{
            result = eval(this.getLine());
            mens+=": "+this.getLine()+" = "+result;
        }
        catch (EvalError){
            result = "Syntax ERROR";
        }
        return result;
    }

    /**
     * Método para limpiar la linea de operación (line)
     * @param {boolean} type True para eliminar memoria, false para respetarla
     */
    this.delete = function(type=false){
        this.setLine("");
        if(type){this.setMemory(0);}
    }

    /**
     * Método para eliminar n caracteres de la lénea de operación (derecha a izquierda)
     * @param {number} n Numero de caracteres a eliminar (por defecto 1)
     */
    this.back = function(n=1){
        this.setLine(this.getLine().slice(0,this.getLine().length-n));
    }

    // MéTODOS DE MEMORIA
    /**
     * Método para sumar un numero al valor de memoria (obj.memory)
     * @param {number} n Numero a sumar
     */
    this.sumMemory = function(n){
        this.setMemory(Number(n)+this.getMemory());
    }
    /**
     * Método para restar un número al valor de memoria (obj.memory)
     * memory - resta
     * @param {number} n Número a restar
     */
    this.restMemory = function(n){
        this.setMemory(this.getMemory()-Number(n));
    }
}