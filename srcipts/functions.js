// "Main" de la calculadora

// Variables de sesion
var panelSup = document.getElementById('panel_s');
var panelInf = document.getElementById('panel_i');
var panelMemo = document.getElementById('panel_m');
var numS = ['0','1','2','3','4','5','6','7','8','9',',']; // teclas validas
var operS = ['+','-','/','*'];
var calcu;
var clear = false;
var lineOperat= "";
var result = 0;

// ======================================================================
// ====================== FUNCIONES ADICIONALES =========================
// ======================================================================
/**
 * Funcion de escritura en los paneles de la calculadora
 * 
 * @param {String} text 'Texto a imprimir'
 * @param {boolean} add 'Modo añadir o sobreescribir'
 * @param {Number} codePanel 'Panel a utilizar'
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
 * Comprobación de existencia de caracter en una lista
 * 
 * @param {*} n Valor a analizar
 * @param {Array} arr Lista donde buscar
 */
function checkChar(ch,arr){
  var check = false;
  if(arr.indexOf(ch)>='0'){
      check = true;
  }
  return check;
}
/**
 * Imprimir si existe el valor de la memoria de la calculadora
 */
function printMemoryIcon(){
  if(calcu.getMemory() != 0){
    console.log("Impresión de memoria");
    writePanel("M = "+calcu.getMemory(),false,2);
  }else{
    writePanel("",false,2);
  }
}
/**
 * Funcion para comprobar si el valor entregado es un numero
 * Se discrimina el infinito
 * @param {*} num Valor a comprobar
 */
function isNumber(num){
  if(num == Infinity){return false;}
  for(var i=0; i<num.length;i++){
    if(numS.indexOf(num.substr(i,i+1))<0){return false;}
  }
  return true;
}


// ======================================================================
// =================== FUNCIONES DE LAS TECLAS ==========================
// ======================================================================
/**
 * Funcion que ejecutara la funcion asociada a cada tecla
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

  /** Bloque 2: Resto de teclas
   *  Separamos las teclas numericas[0:9], las de operación[+,-,*,/], las de borrado (delete o backspace) y la de ejecución (Enter)
   */
  if(checkChar(tecla,numS)){
    calcu.addLine(tecla);
    writePanel(calcu.getLine());
  }
  else if(checkChar(tecla,operS)){
    ln = ""
    if(calcu.getLine() == ""){ln = result;}
    ln += " "+tecla+" ";
    calcu.addLine(ln);
    writePanel(calcu.getLine());
  }
  else if(tecla == 'Enter' || tecla == '='){
    result = calcu.resultCalcu();
    calcu.delete();
    writePanel(result,false,1);
    if(!isNumber(result)){result = 0;}
    clear = true;
  }
  else if(tecla == 'C' || tecla == 'Delete'){
    calcu.delete();
    writePanel();
    writePanel("",false,1)
  }
  else if(tecla == "Backspace"){
    calcu.back();
    writePanel(calcu.getLine(),false);
  }
  console.log("");
}

//===================================================================
//===================== Funciones iniciales =======================
//===================================================================

/**
 * Función para añadir funcionalidad a las teclas de un nombre
 * @param {String} name Nombre asociado al elemento al añadir la funcionalidad
 */
function addTeclas(name){
  console.log('Añadimos botones');
  var teclas = document.getElementsByName(name);
  for(var i=0;i<teclas.length;i++){
      teclas[i].setAttribute("onclick","console.log('Tecla de pantalla');readTc(this.innerHTML);");
  }
}
/**
 * Función que preparará el entorno necesario para el programa
 */
function inic(){
  console.log('Inicio del programa')
  calcu = new Calculator();
  addTeclas('teclas');
  console.log('Levantamos el escuchador de teclas');
  document.addEventListener('keydown',function(tecla){console.log('Tecla de teclado');readTc(tecla.key);},false);
}

document.addEventListener('load',inic(),false);