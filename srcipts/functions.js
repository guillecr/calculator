/**
 * JS Principal de calculadora
 * @author Guillermo Casas Reche
 * @author guillermo.casas@campusfp.es
 * @version 1.0
 */

// Variables de sesion
var panelSup = document.getElementById('panel_s');    // Panel de escritura de la linea de operacion
var panelInf = document.getElementById('panel_i');    // Panel de escritura de resultado
var panelMemo = document.getElementById('panel_m');   // Panle de escritura de la memoria
var numS = ['0','1','2','3','4','5','6','7','8','9',',']; // Teclas validas para la funcion newNum()
var operS = ['+','-','/','*']; // Caracteres validos para la funcion newOper()
var result = 0;         // Resultado del ultimo calculo
var clear = false;      // Semaforo para ejecutar los comandos de limpieza de los paneles
var finOperador=false;  // Bandera que indica si el final de la linea de operacion es una operación
var coma=false;         // Bandera que indica si el numero ya tiene una coma
var calcu;              // Nombre de la variable que albergara nuestro objecto


// ======================================================================
// ====================== FUNCIONES ADICIONALES =========================
// ======================================================================
/**
 * Funcion de escritura en los paneles de la calculadora
 * 
 * - Panel 0: Mostrar el resultado de un calculo (por defecto)
 * - Panel 1: Mostrar la linea de operación
 * - Panel 2: Mostrar el valor de la memoria de la calculadora
 * 
 * @param {String} text Texto a imprimir (por defecto = "")
 * @param {boolean} add Modo de escritura (true: añadir // false (por defecto=): sobreescribir)
 * @param {Number} codePanel Panel a utilizar: 0,1,2
 */
function writePanel(text="",add=false,codePanel=0,){
  // Eleccion de panel de uso
  var panel = panelSup;
  if(codePanel == 1){
    panel = panelInf;
  }else if(codePanel>1){
    panel = panelMemo;
  }
  if(add){
    panel.innerHTML+=text;
  }else{
    panel.innerHTML=text
  }
}

/**
 * Comprobación de existencia de un caracter en una lista
 * 
 * @param {*} n Valor a analizar
 * @param {Array} arr Lista donde buscar
 * @returns Valor booleano del analisis (True: Existe // False: No existe)
 */
function checkChar(ch,arr){
  var check = false;
  if(arr.indexOf(ch)>-1){
      check = true;
  }
  return check;
}

/**
 * Funcion para comprobar si el valor entregado es un numero
 * Se discrimina el infinito
 * @param {*} num Valor a comprobar
 * @returns {boolean} Resultado del analisis
 */
function isNumber(num){
  if(num == Infinity){return false;}
  for(var i=0; i<num.length;i++){
    if(!checkChar(num.substr(i,1),numS)){return false;}
  }
  return true;
}

/**
 * Funcion que imprimirará el valor de la memoria si este es diferente a 0.
 * No devuelve nada.
 */
function printMemoryIcon(){
  if(calcu.getMemory() != 0){
    console.log("Impresión de memoria");
    writePanel("M = "+calcu.getMemory(),false,2);
  }else{
    writePanel("",false,2);
  }
}


// ==========================================================================
// =================== FUNCIONES DE LA CALCULADORA ==========================
// =========================================================================
/**
 * Funcion que ejecuta los comandos propios de calcular un resultadp
 * - Obtiene el resultado del metodo resultCalcu() de la clase calculadora
 * - Escribe por panel el resultado
 * - Si el resultaod es diferente a un numero, la variable resultado cambia a 0
 * - La bandera clear pasa a true y la de finOperador y coma a false
 */
function calcular(){
  result = calcu.resultCalcu();
  calcu.delete();
  writePanel(result,false,1);
  if(!isNumber(result)){result = 0;}
  clear = true;
  finOperador = false;
  coma = true;
}

/**
 * Función para añadir un nuevo numero a la linea de operacion de la calculadora
 * - Si se añade una coma se levanta la bandera para no poder introducir mas en ese numero
 * - Si es una coma con la vandera de la coma levantada, no la escribirá
 * @param {number} num Numero al que añadir a nuestra clase
 */
function newNum(num){
  if(num==","){
    if(coma){
      num="";
    }else{
      coma=true;
    }
  }
  calcu.addLine(num);
  writePanel(calcu.getLine());
  finOperador = false;
}

/**
 * Funcion para añadir el caracter de una operación
 * - Si la bandera de operación esta levantada, cambiará el ultimo operador por el nuevo
 * - Si se añade un operador cuando la linea esta vacia, añadirá el ultimo resultado obtenido
 * @param {string} opera Operador a añadir
 */
function newOper(opera){
  if(!finOperador){
    ln = "";
    if(calcu.getLine() == ""){ln = result;}
    ln += " "+opera+" ";
    console.log(ln);  
    calcu.addLine(ln);
    writePanel(calcu.getLine());
    finOperador = true;
  }else{ 
    calcu.back(3);
    finOperador = false;
    newOper(opera);
  }
  coma=false;
}

/**
 * Funcion para limpiar todo los 2 paneles principales y limpiar la calculadora
 * Solo mantendra la memoria de la calculadora
 * Restaurará la bandera finOperador y coma (false)
 */
function limpiar(){
  calcu.delete();
  writePanel();
  writePanel("",false,1);
  finOperador = false;
  coma=false;
}

/**
 * Funcion para borrado a la izquiera
 * - Por defecto solo borrará uno a la izquiera de la linea de operacion de la clase calculadora
 * - Si despues del borrado no tenemos numeros antes del operador, levantará la bandera finOperador
 * - Si la bandera finOperador esta levantado, borrará 3 a la izquierda y restaurará la bandera
 * - Si se borra la coma se podra volver a escribir la coma
 * Al final escribira en el panel el resultado del borrado
 */
function backsp(){
  n = 1;
  if(calcu.getLine().substr(calcu.getLine().length-1,1)==","){coma=false;}
  prediccion = calcu.getLine().substr(calcu.getLine().length-2,1);
  if(finOperador){
    n = 3;
    finOperador=false;
  }else if(prediccion==" "){
    finOperador=true;
  }
  calcu.back(n);
  writePanel(calcu.getLine(),false);
}


// =============================================================================================================
// ============================== Definición de las funciones de las teclas ====================================
// =============================================================================================================
/**
 * Funcion que ejecutara la funcion asociada a cada tecla
 * - MR: Función para escribir el numero en memoria 
 * - M+: Funcion para sumar el ultimo resultado a la memoria existente
 * - M-: Funcion para restar el ultimo resultado ala memoria existente
 * - Numero: Añadirá el numero introducido a la linea de operacion de nuestra clase y escribirá
 *   la linea en el panel principal
 * - Operador: Añadira el operador a la linea de operacion de nuestra clase. Si la bandera de operación 
 *   esta levantada, cambiara el ultimo operador por el nuevo
 * - Enter: Ejecutara la funcion de calcular de la clase calculadora
 * - Backspace: Eliminará el ultimo caracter introducido
 * - Clear: Limpiara todo el panel y linea de operación de la calculadora. Solo se mantiene el ultimo resultado y la memoria
 * 
 * Añadidamente, si precedemos de la ejecucion de una operación, al volver a escribir, se reseteará el panel.(clear())
 * @param {String} tecla Tecla pulsada
 */
function readTc(tecla){
  console.log("Tecla pulsada: "+tecla);

  /* Bloque 1: Funcion de memoria o limpiado de pantalla
  *  Considero que si se usa una funcion de memoria no deberia de borrarse la pantalla
  *  Si se hace uso de las funciones de memoria no llegara a ejecutarse el limpiado de pantalla
  */
  if(tecla == "MR"){
    calcu.addLine(calcu.getMemory());
    writePanel(calcu.getLine());
  }
  else if(tecla == "M+"){
    calcu.sumMemory(result);
  }
  else if(tecla == "M-"){
    calcu.restMemory(result);
  }
  else if(clear){
    console.log("Limpiar panel");
    writePanel();
    clear=false;
  }
  printMemoryIcon();

  //Bloque 2: Resto de teclas
  if(checkChar(tecla,numS)){
    newNum(tecla);
  }
  else if(checkChar(tecla,operS)){
    newOper(tecla);
  }
  else if(tecla == 'Enter' || tecla == '='){
    calcular();
  }
  else if(tecla == 'C' || tecla == 'Delete'){
    limpiar();
  }
  else if(tecla == "Backspace"){
    backsp();
  }
  console.log(finOperador);
  console.log("================");
}


//===================================================================
//===================== FUNCIONES INICIALES =========================
//===================================================================

/**
 * Función para añadir funcionalidad a las teclas de un nombre
 * @param {String} name Nombre asociado al elemento al añadir la funcionalidad
 */
function addTeclas(name){
  console.log('Añadimos botones virtuales');
  var teclas = document.getElementsByName(name);
  for(var i=0;i<teclas.length;i++){
      teclas[i].setAttribute("onclick","console.log('Tecla de pantalla');readTc(this.innerHTML);");
  }
}
/**
 * Función que preparará el entorno necesario para el programa
 * - Creamos la instancia de nuestra clase calculator
 * - Añadimos la funcionalidad a las teclas indicadas
 * - Levantamos el Listener de lectura por teclado
 */
function inic(){
  console.log('Inicio del programa')
  calcu = new Calculator();
  addTeclas('teclas');
  console.log('Levantamos el escuchador de teclas');
  document.addEventListener('keydown',function(tecla){console.log('Tecla de teclado');readTc(tecla.key);},false);
}

// Inicializador del programa
document.addEventListener('load',inic(),false);