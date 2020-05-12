/**
 * JS Principal de calculadora
 * @author Guillermo Casas Reche
 * @author guillermo.casas@campusfp.es
 * @version 1.0
 */

// Variables de sesion
var panelSup = document.getElementById('panel_s');    // Panel de escritura de la línea de operación
var panelInf = document.getElementById('panel_i');    // Panel de escritura de resultado
var panelMemo = document.getElementById('panel_m');   // Panle de escritura de la memoria

var numS = ['0','1','2','3','4','5','6','7','8','9','.']; // Teclas válidas para la funcion newNum()
var operS = ['+','-','/','*']; // Caracteres válidos para la función newOper()

var result = 0;         // Resultado del último cálculo

var clear = false;      // Semáforo para ejecutar los comandos de limpieza de los paneles
var finOperador=false;  // Bandera que indica si el final de la linea de operación es un operador
var coma=false;         // Bandera que indica si el número ya tiene una coma

var calcu;              // Nombre de la variable que albergará nuestro objecto


// ======================================================================
// ====================== FUNCIONES ADICIONALES =========================
// ======================================================================
/**
* Función de escritura en los paneles de la calculadora
 * 
 * - Panel 0: Mostrar el resultado de un cálculo (por defecto)
 * - Panel 1: Mostrar la línea de operación
 * - Panel 2: Mostrar el valor de la memoria de la calculadora
 * 
 * @param {String} text Texto a imprimir (por defecto = "")
 * @param {boolean} add Modo de escritura (true: añadir // false (por defecto=): sobreescribir)
 * @param {Number} codePanel Panel a utilizar: 0,1,2
 */
function writePanel(text="",add=false,codePanel=0,){
  // Elección del panel de uso
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
 * Comprobación de existencia de un carácter en una lista
 * 
 * @param {*} n Valor a analizar
 * @param {Array} arr Lista donde buscar
 * @returns Valor booleano del análisis (True: Existe // False: No existe)
 */
function checkChar(ch,arr){
  var check = false;
  if(arr.indexOf(ch)>-1){
      check = true;
  }
  return check;
}

/**
 * Función para comprobar si el valor entregado es un número
 * Se discrimina el infinito y NaN
 * @param {*} num Valor a comprobar
 * @returns {boolean} Resultado del análisis
 */
function isNumber(num){
  if(num == Infinity || isNaN(num)){return false;}
  for(var i=0; i<num.length;i++){
    if(!checkChar(num.substr(i,1),numS)){return false;}
  }
  return true;
}

/**
 * Función que imprimirará el valor de la memoria si este es diferente a 0.
 * No devuelve nada.
 */
function printMemoryIcon(){
  console.log("Memoria: "+calcu.getMemory());
  if(calcu.getMemory() != 0){
    writePanel("M = "+calcu.getMemory(),false,2);
  }else{
    writePanel("",false,2);
  }
}


// ==========================================================================
// =================== FUNCIONES DE LA CALCULADORA ==========================
// =========================================================================
/**
 * Función que ejecuta los comandos propios de calcular un resultado
 * - Obtiene el resultado del método resultCalcu() de la clase calculadora
 * - Escribe por panel el resultado
 * - Si el resultado es diferente a un número, la variable resultado cambia a 0
 * - La bandera clear pasa a true y la de finOperador y coma a false
 */
function calcular(){
  if(calcu.getLine()!=""){
    result = calcu.resultCalcu();
  }
  calcu.delete();
  writePanel(result,false,1);
  if(!isNumber(result)){result = 0;}
  clear = true;
  coma = false;
  finOperador = false;
}

/**
 * Función para añadir un nuevo número a la línea de operación de la calculadora
 * - Si se añade una coma se levanta la bandera para no poder introducir más en ese numero
 * - Si es una coma con la bandera de la coma levantada, no la escribirá
 * @param {number} num Numero al que añadir a nuestra clase
 */
function newNum(num){
  if(num=="."){
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
 * Función para añadir el carácter de una operación
 * - Si la bandera de operación esta levantada, cambiará el ultimo operador por el nuevo
 * - Si se añade un operador cuando la línea esta vacía, añadirá el ultimo resultado obtenido
 * @param {string} opera Operador a añadir
 */
function newOper(opera){
  if(!finOperador){
    ln = "";
    if(calcu.getLine() == ""){ln = result;}
    ln += " "+opera+" ";
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
 * Función para limpiar todo los 2 paneles principales y limpiar la calculadora
 * Solo mantendrá la memoria de la calculadora
 * Restaurará la bandera finOperador y coma (false)
 */
function limpiar(){
  calcu.delete(true);
  writePanel();
  writePanel("",false,1);
  finOperador = false;
  coma=false;
}

/**
 * Función para borrado a la izquierda
 * - Por defecto solo borrará uno a la izquierda de la línea de operación de la clase calculadora
 * - Si después del borrado no tenemos números antes del operador, levantará la bandera finOperador
 * - Si la bandera finOperador esta levantado, borrará 3 a la izquierda y restaurará la bandera
 * - Si se borra la coma se podrá volver a escribir la coma
 * Al final escribirá en el panel el resultado del borrado
 */
function backsp(){
  n = 1;
  if(calcu.getLine().substr(calcu.getLine().length-1,1)=="."){coma=false;}
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
 * Función que ejecutara la función asociada a cada tecla
 * - MR: Función para escribir el número en memoria 
 * - M+: Función para sumar el ultimo resultado a la memoria existente
 * - M-: Función para restar el ultimo resultado a la memoria existente
 * - Numero: Añadirá el número introducido a la línea de operación de nuestra clase y escribirá
 *   la línea en el panel principal
 * - Operador: Añadirá el operador a la línea de operación de nuestra clase. Si la bandera de operación 
 *   esta levantada, cambiara el ultimo operador por el nuevo
 * - Enter: Ejecutara la función de calcular de la clase calculadora
 * - Backspace: Eliminará el ultimo carácter introducido
 * - Clear: Limpiara todo el panel y línea de operación de la calculadora. Solo se mantiene el ultimo resultado y la memoria
 * 
 * Además, si precedemos de la ejecución de una operación, al volver a escribir, se reseteará el panel.(clear())
 * @param {String} tecla Tecla pulsada
 */
function readTc(tecla){
  mens="Nunguna función asociada";
  if(tecla == "MR"){
    mens="Escritura de memoria";
    calcu.addLine(calcu.getMemory());
    writePanel(calcu.getLine());
  }
  else if(tecla == "M+"){
    mens="Sumado a memoria";
    calcu.sumMemory(result);
  }
  else if(tecla == "M-"){
    mens="Restado a memoria";
    calcu.restMemory(result);
  }
  else if(checkChar(tecla,numS)){
    mens="Nuevo numero";
    newNum(tecla);
  }
  else if(checkChar(tecla,operS)){
    mens="Nuevo operador";
    newOper(tecla);
  }
  else if(tecla == 'Enter' || tecla == '='){
    mens="Calcular resultado";
    calcular();
  }
  else if(tecla == 'C' || tecla == 'Delete'){
    mens="Borrado de panel";
    limpiar();
  }
  else if(tecla == "Backspace"){
    mens="Borrado lateral";
    backsp();
  }
  
  console.log(mens);
  printMemoryIcon();
  console.log("Bandera operador: "+finOperador);
  console.log("Bandera de coma: "+coma);
  console.log("Semaforo de limpiado: "+clear);
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
      teclas[i].setAttribute("onclick","console.log('Tecla de pantalla: '+this.innerHTML);readTc(this.innerHTML);");
  }
}
/**
 * Función que preparará el entorno necesario para el programa
 * - Creamos la instancia de nuestra clase calculator
 * - Añadimos la funcionalidad a las teclas indicadas
 * - Levantamos el Listener de lectura por teclado
 */
function inic(){
  console.log('Inicio de la calculadora')
  calcu = new Calculator();
  addTeclas('teclas');
  console.log('Levantamos el Listener de las teclas');
  document.addEventListener('keydown',function(tecla){console.log('Tecla fisica: '+tecla.key);readTc(tecla.key);},false);
  console.log("Calculadora lista");
  console.log("================");
}

// Inicializador del programa
document.addEventListener('load',inic(),false);