
import React, { Component } from 'react';
import logo from './idioma.svg';

import './App.css';

var Tk;
var ErTk;

class App extends Component {
  constructor() {
    super();
    this.state = {
      ruta: '',

    }
  }



  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    //leer archivos
    var Data = new Array();
    var ArchivoTxt = new XMLHttpRequest();
    var ruta = 'PRUEBA.txt';
    ArchivoTxt.open("GET", ruta, false);
    ArchivoTxt.send(null);
    var txt = ArchivoTxt.responseText;
    for (var i = 0; i < txt.length; i++) {
      Data.push(txt[i]);
    }

    // Analisis Lexico


    // variables para declarar

    var I_n_t = "int";
    var Str = "string";
    var Float = "Float";
    var B_o_o_l = "Bool";
    var Char = "Char";
    var Consola = "Console.WriteLine";

    var IF = "if";
    var Else = "else";
    var FLOAT = "Float";
    var Sw = "Switch";
    var c_a_s_E = "case";
    var columna = 0;
    var fila = 0;
    var indice = 0;
    var estado = 0;
    var lexema = "";
    var d_e_f_a_u_l_T = "default";
    var w_h_i_l_E = "While";
    var class_ = "class";
    var static_ = "static";
    var void_ = "void";
    var true_ = "true";
    var false_ = "false";
    var for_ = "for";
    var Main_ = "main";
    var args = "args";
    var NEW = "new";
    var BREAK = "break";
    var ERROR1 = "Error Lexico";
    var Tks = [];
    var ErTks = [];
    var auxdividir = "";
    var ids = 0;
    var idse = 0;
    // mi constructor de Tokens

    function Tokens(id, columna, fila, token, tipo) {

      this.columna = columna;
      ids++;
      this.fila = fila;
      this.id = ids;
      this.token = token;
      this.tipo = tipo;

    }

    /// CONSTRUCTOR ERRORES TOKENS

    function ERTokens(id, columna, fila, token, Descripcion) {

      this.columna = columna;
      idse++;
      this.fila = fila;
      this.id = idse;
      this.token = token;

      this.Descripcion = Descripcion;
    }
    // aqui lo añado ala lista de Tokens
    function AgregarToken(columna, fila, token, tipo) {


      indice++;
      Tk = new Tokens(indice, columna, fila, token, tipo);
      Añadir();
      estado = 0;
      lexema = "";
    }
    function AgregarToken2(columna, fila, token, tipo) {


      indice++;
      Tk = new Tokens(indice, columna, fila, token, tipo);
      Añadir();
      estado = 0;
      lexema = "";
    }




    function Añadir() {

      Tks.push(Tk);
      console.log(Tks);
    }
    function AgregarErToken(columna, fila, token, Descripcion) {


      indice++;
      ErTk = new Tokens(indice, columna, fila, token, Descripcion);
      Añadir2();

    }


    function Añadir2() {

      ErTks.push(ErTk);
      console.log(ErTks);
    }

    // mi scan basicamente
    Data.forEach(function (data) {
   //e---------------------------------------------------------------------------------------------------------
    /*
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      l              eeeeeeeeee       x         x
      l              e                  x    x 
      l              eeeeeeeeee           x
      l              e                 x     x
      lllllllllllll  eeeeeeeeee     x          x



xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


    */  switch (estado) {
        case 0:
          console.log(estado);
          if (data.toLowerCase().charCodeAt(0) >= 97 && data.toLowerCase().charCodeAt(0) <= 122) {
            estado = 1;
            columna++;
            lexema += data;

          }

          else if (data.toLowerCase().charCodeAt(0) >= 48 && data.toLowerCase().charCodeAt(0) <= 57) {
            estado = 2;

            lexema += data;
          }

          else if (";" === data) {
            lexema += data;
            columna++;
            AgregarToken(columna, fila, lexema, "PUNTOYCOMA")
          }
          else if ("." === data) {
            lexema += data;
            columna++;
            AgregarToken(columna, fila, lexema, "PUNTO")
          } else if ("," === data) {
            lexema += data;
            columna++;
            AgregarToken(columna, fila, lexema, "COMA")
          }

          else if ("{" === data) {
            lexema += data;
            columna++;
            AgregarToken(columna, fila, lexema, "LLAVEABIERTA")
          }

          else if ("}" === data) {
            lexema += data;
            columna++;
            AgregarToken(columna, fila, lexema, "LLAVECERRADA")
          }

          else if ("(" === data) {
            lexema += data;
            columna++;
            AgregarToken(columna, fila, lexema, "PARENTESIS_ABIERTO")
          }

          else if (")" === data) {
            lexema += data;
            columna++;
            AgregarToken(columna, fila, lexema, "PARENTESIS_CERRADO")
          }

          else if (">" === data) {
            lexema += data;

            estado = 6;
          }
          else if ("<" === data) {
            lexema += data;
            estado = 7;
          }
          else if ("+" === data) {
            lexema += data;
            columna++;
            AgregarToken(columna, fila, lexema, "MAS")
          }
          else if ("-" === data) {
            lexema += data;
            columna++;
            AgregarToken(columna, fila, lexema, "MENOS")
          }

          else if ("*" === data) {
            lexema += data;
            columna++;
            AgregarToken(columna, fila, lexema, "POR")
          } else if ("/" === data) {

            var aux = data;
            AgregarToken2(columna, fila, data, "BARRA")

            auxdividir += data;
            estado = 9;
          }
          else if ("!" === data) {
            lexema += data;
            estado = 8;
          }
          else if ("&" === data) {
            lexema += data;
            columna++;
         
            estado =13;
          }


          else if ("|" === data) {
            lexema += data;
            columna++;
          estado=12;


          }
          else if ("=" === data) {
            lexema += data;
            columna++;

            estado = 5;
          }

          else if ("  " === data) {
            console.log("espacio")
            columna++;

          }
          else if ('\u0022' === data) {
            columna++;
            estado = 3;
          }


          break;

        case 1:

          if (data.toLowerCase().charCodeAt(0) >= 97 && data.toLowerCase().charCodeAt(0) <= 122) {

            estado = 1;
            lexema += data;

          }
          else if ("int" === lexema) {


            AgregarToken(columna, fila, lexema, "INT")
            estado = 0;
            lexema = "";
          }


          else if ("true" === lexema) {


            AgregarToken(columna, fila, lexema, "TRUE")
            estado = 0;
            lexema = "";
          }


          else if ("false" === lexema) {


            AgregarToken(columna, fila, lexema, "FALSE")
            estado = 0;
            lexema = "";
          }


          else if ("string" === lexema) {


            AgregarToken(columna, fila, lexema, "STRING")
            estado = 0;
            lexema = "";
          }



          else if ("char" === lexema) {


            AgregarToken(columna, fila, lexema, "CHAR")
            estado = 0;
            lexema = "";
          }



          else if ("bool" === lexema) {


            AgregarToken(columna, fila, lexema, "BOOL")
            estado = 0;
            lexema = "";
          }
          else if ("double" === lexema) {


            AgregarToken(columna, fila, lexema, "DOUBLE")
            estado = 0;
            lexema = "";
          }
          else if ("char" === lexema) {


            AgregarToken(columna, fila, lexema, "CHAR")
            estado = 0;
            lexema = "";
          }
          else if ("bool" === lexema) {


            AgregarToken(columna, fila, lexema, "BOOL")
            estado = 0;
            lexema = "";
          }
          else if ("void" === lexema) {


            AgregarToken(columna, fila, lexema, "VOID")
            estado = 0;
            lexema = "";
          }

          else if ("main" === lexema) {


            AgregarToken(columna, fila, lexema, "MAIN")
            estado = 0;
            lexema = "";
          }
          else if ("class" === lexema) {


            AgregarToken(columna, fila, lexema, "CLASS")
            estado = 0;
            lexema = "";
          }
          else if ("if" === lexema) {


            AgregarToken(columna, fila, lexema, "IF")
            estado = 0;
            lexema = "";
          }

          else if ("else" === lexema) {


            AgregarToken(columna, fila, lexema, "ELSE")
            estado = 0;
            lexema = "";


          }
          else if ("switch" === lexema) {


            AgregarToken(columna, fila, lexema, "SWITCH")
            estado = 0;
            lexema = "";


          }
          else if ("case" === lexema) {


            AgregarToken(columna, fila, lexema, "CASE")
            estado = 0;
            lexema = "";


          }

          else if ("for" === lexema) {


            AgregarToken(columna, fila, lexema, "FOR")
            estado = 0;
            lexema = "";


          }


          else if ("while" === lexema) {


            AgregarToken(columna, fila, lexema, "WHILE")
            estado = 0;
            lexema = "";


          }
          else if ("do" === lexema) {


            AgregarToken(columna, fila, lexema, "DO")
            estado = 0;
            lexema = "";


          }
          else if ("return" === lexema) {


            AgregarToken(columna, fila, lexema, "RETURN")
            estado = 0;
            lexema = "";


          }
          else if ("break" === lexema) {


            AgregarToken(columna, fila, lexema, "BREAK")
            estado = 0;
            lexema = "";


          }
          else if ("continue" === lexema) {


            AgregarToken(columna, fila, lexema, "CONTINUE")
            estado = 0;
            lexema = "";


          }
          else if ("Console" === lexema) {

            if ("." === data) {
              lexema += data;
              estado = 1;
            }

          }
          else if ("Console.Write" === lexema) {

            AgregarToken(columna, fila, lexema, "CONSOLA")
            estado = 0;
            lexema = "";

          }

          else {

            AgregarToken(columna, fila, lexema, "id")



          }
          break;
        case 2:

          if (data.toLowerCase().charCodeAt(0) >= 48 && data.toLowerCase().charCodeAt(0) <= 57) {
            lexema += data;
          } else {
            AgregarToken(columna, fila, lexema, "DIGITO")
          }
          break;



        ////////////////DIigitos 

        case 3:

          if ('\u0022' === data) {
            AgregarToken(columna, fila, lexema, "COMILLAS")
          }
          else {

            lexema += data;
            columna++;
          }
          break;

        case 4:

          if ('\u0022' === data) {
            AgregarToken(columna, fila, lexema, "CONSOLA")
            estado = 0;
            lexema = "";
          } else {

            lexema += data;
            columna++;
          }
          break;
        case 5:
          if ("=" === data) {


            lexema += data;
            AgregarToken(columna, fila, lexema, "DOBLEIGUAL");
            estado = 0;
            lexema = "";
          }

          else {
            AgregarToken(columna, fila, lexema, "IGUAL");
          }
          break;


        case 6:
          if ("=" === data) {


            lexema += data;
            AgregarToken(columna, fila, lexema, "MAYORIGUAL");
            estado = 0;
            lexema = "";

          }

          else {
            AgregarToken(columna, fila, lexema, "MAYOR");
          }
          break;


        case 7:
          if ("=" === data) {


            lexema += data;
            AgregarToken(columna, fila, lexema, "MENORIGUAL");
            estado = 0;
            lexema = "";

          }

          else {
            AgregarToken(columna, fila, lexema, "MENOR");
          }
          break;
        case 8:
          if ("=" === data) {


            lexema += data;
            AgregarToken(columna, fila, lexema, "DIFERENTE");
            estado = 0;
            lexema = "";

          }
          /**  */

          else {
            lexema += data;
            AgregarToken(columna, fila, lexema, "NOT");
            estado = 0;
            lexema = "";
          }
          break;
        case 9:

          if ("*" === data) {
            estado = 11;
          }
          else if ("/" === data) {

            estado = 10;
          }
          else {
            estado = 0;
          }
          break;
        case 10:
          if (data === "\n") {


            AgregarToken(columna, fila, lexema, "COMENTARIO_SIMPLE");

          } else {
            lexema += data;

          }

          break;
        case 11:
          if (data === "*") {


            console.log(lexema)
            AgregarToken(columna, fila, lexema, "COMENTARIO_MULTI");
            AgregarToken2(columna, fila, data, "ASTERISCO");

          } else {


            lexema += data;
          }
          break;
  case 12:
    if ("|" === data) {
      lexema += data;
      columna++;
      AgregarToken(columna, fila, lexema, "OR")
      estado=0;
      lexema="";

    }  
  break;
          case 13:
            if ("&" === data) {
              lexema += data;
              columna++;
              AgregarToken(columna, fila, lexema, "AND")
               estado=0;
               lexema="";
            }

            break;


      }

    });




    ////////////////sintactico///////////////////////

    /*     SSSSSSSS
           S         I                N N     N
           S         I                N  N   N
           S         I                N   N N
ssssssssssss         i                N    N

    */
    var traduccion = "";
    var valif = false;
    var valelse=false;
    var void_=false;
    var switch_ = false;
    var for_=false;
    var main_ =false;
    var while_=false;
    var do_;
    var declaracion=false;
    //// Primero Vamos a declarar un menu 

    for (var i = 0; i < Tks.length; i++) {
      Menu();

      function Menu() {
        valif = false;
        if (Tks[i].tipo === "VOID") {
          traduccion += "def";
          MENU_VOID();
        }  else if (Tks[i].tipo === ";") {
          
          COMENTARIOS()
        }
        else if (Tks[i].tipo === "WHILE") {
          traduccion+="while"
          MenuWhile()
        }

        else if (Tks[i].tipo === "BARRA") {
          COMENTARIOS()
        }
      
        else if (Tks[i].tipo === "CONSOLA") {

          traduccion += "print";
          MenuConsole();
        }
        else if (Tks[i].tipo === "BOOL") {

          traduccion += "var"
          MenuVariables();
        }
        else if (Tks[i].tipo === "INT") {

          traduccion += "var"
          MenuVariables();
        }
        else if (Tks[i].tipo === "IF") {

          traduccion += "if"+"  "
          MenuIf();
        }
        else if (Tks[i].tipo === "STRING") {

          traduccion += "var"; MenuVariables();
        }

        else if (Tks[i].tipo === "DOUBLE") {

          traduccion += "var"
          MenuVariables();
        }
        else if (Tks[i].tipo === "CHAR") {

          traduccion += "var"; MenuVariables();
        }


        else {
          AgregarErToken(Tks[i].columna, Tks[i].fila, Tks[i].token, "se esperaba token")

        }
      }










//WHILE
/* -------------------------------------------------------------------------


wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww

*/





function MenuWhile() {
  i++;

  if (Tks[i].tipo === "PARENTESIS_ABIERTO") {

    CondicionWhile()

  }

  else {
    AgregarErToken(Tks[i].columna, Tks[i].fila, Tks[i].token, "se esperaba  ( para el while")

  }
}


function CondicionWhile() {

  i++; if (
    Tks[i].tipo === "id"
  ) { 
    traduccion+= Tks[i].token;  CondicionalesWhile();
        

  }
  else if (
    Tks[i].tipo === "COMILLAS"
  ) { 
    traduccion+= Tks[i].token;  CondicionalesWhile();
        

  }   else if (
    Tks[i].tipo === "DIGITO"
  ) { 
    traduccion+= Tks[i].token;  CondicionalesWhile();
        

  }

  else{
    AgregarErToken(Tks[i].columna,Tks[i].fila,Tks[i].token,"se esperaba token")
    
          }


      
}

function CondicionalesWhile(){


i++;

if(Tks[i].tipo==="DIFERENTE"){
traduccion+=Tks[i].token;
IDsegundoWhile();
}


else if(Tks[i].tipo==="MAYOR"){
traduccion+=Tks[i].token;
IDsegundoWhile();    
}

else if(Tks[i].tipo==="IGUAL"){
traduccion+=Tks[i].token;

IDsegundoWhile();}

else  if(Tks[i].tipo==="DOBLEIGUAL"){
traduccion+=Tks[i].token;
IDsegundoWhile();    
}

else if(Tks[i].tipo==="MAYORIGUAL"){
traduccion+=Tks[i].token;
IDsegundoWhile();    
}

else if(Tks[i].tipo==="MENOR"){
traduccion+=Tks[i].token;
IDsegundoWhile();}


else if(Tks[i].tipo==="MENORIGUAL"){
  traduccion+=Tks[i].token;
  IDsegundoWhile();}

    else {
      AgregarErToken(Tks[i].columna, Tks[i].fila, Tks[i].token, "se esperaba condicional para el while ")

    }

}

function IDsegundoWhile(){
i++;

if(Tks[i].tipo==="id")
{
traduccion+=Tks[i].token;

Parentesis2doWhile();
}

else if(Tks[i].tipo==="DIGITO")
{
traduccion+=Tks[i].token;

Parentesis2doWhile();
}
else if(Tks[i].tipo==="COMILLAS")
{
traduccion+=Tks[i].token;

Parentesis2doWhile();
}


else{
AgregarErToken(Tks[i].columna, Tks[i].fila, Tks[i].token, "se esperaba segundo idpara el while ")


}

function Parentesis2doWhile(){
i++;
if(Tks[i].tipo==="PARENTESIS_CERRADO"){

LLAVEWhile();
}

else if(Tks[i].tipo==="AND"){

traduccion+="and"+" ";
CondicionWhile();
}

else if(Tks[i].tipo==="OR"){

traduccion+="or"+" ";
CondicionWhile();
}
else{

AgregarErToken(Tks[i].columna, Tks[i].fila, Tks[i].token, " se esperaba ) para cerrar el while ")



}
}



}
function LLAVEWhile(){
while_=true;
i++;

if(Tks[i].tipo==="LLAVEABIERTA")
{
WhileMenu();
}
else{
AgregarErToken(Tks[i].columna, Tks[i].fila, Tks[i].token, " se esperaba { empezar la sentencia del while   ")

}
}

function WhileMenu(){


i++; 
while_=true;
console.log(Tks[i].tipo)


if (Tks[i].tipo === "BARRA") {
  COMENTARIOS()
}
 else if (Tks[i].tipo === "id") {
  DeclaracionId();
}

else if (Tks[i].tipo === "CONSOLA") {

  traduccion += "print";
  MenuConsole();
}
else if (Tks[i].tipo === "BOOL") {

  traduccion += "var"
  MenuVariables();
}
else if (Tks[i].tipo === "INT") {

  traduccion += "var"
  MenuVariables();
}
else if (Tks[i].tipo === "IF") {

  traduccion += "if"+"  "
  MenuIf();
}
else if (Tks[i].tipo === "STRING") {

  traduccion += "var"; MenuVariables();
}

else if (Tks[i].tipo === "DOUBLE") {

  traduccion += "var"
  MenuVariables();
}
else if (Tks[i].tipo === "CHAR") {

  traduccion += "var"; MenuVariables();
}
else if (Tks[i].tipo === "IF") {

  traduccion += "if"+"  "
  MenuIf();
}

else if(
Tks[i].tipo==="LLAVECERRADA"){
if(valelse===true){

Menu();
}
else if (while_===true){
Menu();

}else {
Menu();  
}
console.log("siuuuua3333333333333333333333333333333")
}else {
AgregarErToken(Tks[i].columna, Tks[i].fila, Tks[i].token, " se esperaba } terminar  la sentencia del while  ")


}

}



function MenuDo(){

  i++;
  if(Tks[i].tipo==="LLAVEABIERTA"){

 SEntencia_Do();

  }
  else{
    AgregarErToken(Tks[i].columna, Tks[i].fila, Tks[i].token, " se esperaba para iniciar el do ")

  }

  
}

function SEntencia_Do(){








}









      






















/* IFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
*/
      function MenuIf() {
        i++;

        if (Tks[i].tipo === "PARENTESIS_ABIERTO") {

          CondicionIf()

        }

        else {
          AgregarErToken(Tks[i].columna, Tks[i].fila, Tks[i].token, "se esperaba  ) para el if")

        }
      }


      function CondicionIf() {

        i++; if (
          Tks[i].tipo === "id"
        ) { 
          traduccion+= Tks[i].token;  CondicionalesIf();
              

        }
        else if (
          Tks[i].tipo === "COMILLAS"
        ) { 
          traduccion+= Tks[i].token;  CondicionalesIf();
              

        }   else if (
          Tks[i].tipo === "DIGITO"
        ) { 
          traduccion+= Tks[i].token;  CondicionalesIf();
              

        }
      
        else{
          AgregarErToken(Tks[i].columna,Tks[i].fila,Tks[i].token,"se esperaba token")
          
                }


            
      }

function CondicionalesIf(){


  i++;

  if(Tks[i].tipo==="DIFERENTE"){
traduccion+=Tks[i].token;
IDsegundo();
  }

  
  else if(Tks[i].tipo==="MAYOR"){
    traduccion+=Tks[i].token;
    IDsegundo();    
  }
      
  else if(Tks[i].tipo==="IGUAL"){
    traduccion+=Tks[i].token;
      
    IDsegundo();}
      
  else  if(Tks[i].tipo==="DOBLEIGUAL"){
    traduccion+=Tks[i].token;
    IDsegundo();    
  }
      
  else if(Tks[i].tipo==="MAYORIGUAL"){
    traduccion+=Tks[i].token;
    IDsegundo();    
  }
      
  else if(Tks[i].tipo==="MENOR"){
    traduccion+=Tks[i].token;
    IDsegundo();}


      else if(Tks[i].tipo==="MENORIGUAL"){
        traduccion+=Tks[i].token;
        IDsegundo();}

          else {
            AgregarErToken(Tks[i].columna, Tks[i].fila, Tks[i].token, "se esperaba condicional para el if ")

          }

    }

    function IDsegundo(){
i++;

if(Tks[i].tipo==="id")
{
traduccion+=Tks[i].token;

Parentesis2do();
}

else if(Tks[i].tipo==="DIGITO")
{
traduccion+=Tks[i].token;

Parentesis2do();
}
else if(Tks[i].tipo==="COMILLAS")
{
traduccion+=Tks[i].token;

Parentesis2do();
}


else{
  AgregarErToken(Tks[i].columna, Tks[i].fila, Tks[i].token, "se esperaba segundo idpara el if ")


}

function Parentesis2do(){
i++;
if(Tks[i].tipo==="PARENTESIS_CERRADO"){

  LLAVEiF();
}

else if(Tks[i].tipo==="AND"){

  traduccion+="and"+" ";
  CondicionIf();
}

else if(Tks[i].tipo==="OR"){

  traduccion+="or"+" ";
  CondicionIf();
}
else{

  AgregarErToken(Tks[i].columna, Tks[i].fila, Tks[i].token, " se esperaba ) para cerrar el if ")



}
}

 

    }
    function LLAVEiF(){
valif=true;
i++;

if(Tks[i].tipo==="LLAVEABIERTA")
{
   IfMenu();
}
else{
  AgregarErToken(Tks[i].columna, Tks[i].fila, Tks[i].token, " se esperaba { empezar la sentencia del if   ")
  
}
    }

    function IfMenu(){


      i++; 
valif=true;
      console.log(Tks[i].tipo)
      if (Tks[i].tipo === "id") {
      traduccion+= Tks[i].token+"  ";
        DeclaracionId();
      }
    

 else  if (Tks[i].tipo === "BARRA") {
        COMENTARIOS()
      }
    
      else if (Tks[i].tipo === "CONSOLA") {

        traduccion += "print";
        MenuConsole();
      }
      else if (Tks[i].tipo === "BOOL") {

        traduccion += "var"
        MenuVariables();
      }
      else if (Tks[i].tipo === "INT") {

        traduccion += "var"
        MenuVariables();
      }
      else if (Tks[i].tipo === "IF") {

        traduccion += "if"+"  "
        MenuIf();
      }
      else if (Tks[i].tipo === "STRING") {

        traduccion += "var"; MenuVariables();
      }

      else if (Tks[i].tipo === "DOUBLE") {

        traduccion += "var"
        MenuVariables();
      }
      else if (Tks[i].tipo === "CHAR") {

        traduccion += "var"; MenuVariables();
      }
      else if (Tks[i].tipo === "IF") {

        traduccion += "if"+"  "
        MenuIf();
      }

else if(
  Tks[i].tipo==="LLAVECERRADA"){
if(valelse===true){

  Menu();
}
else if (while_===true){
  Menu();
   
}else {

CerradaIf();  
}
console.log("siuuuua3333333333333333333333333333333")
 }else {
  AgregarErToken(Tks[i].columna, Tks[i].fila, Tks[i].token, " se esperaba } terminar  la sentencia del if   ")
  
  
 }

    }

     function CerradaIf(){

i++;
if(Tks[i].tipo==="ELSE")

{
  traduccion+="  "+"else"+" ";
Elses();



}else{
  Menu();
}

     }

     function Elses(){
i++;
 if(Tks[i].tipo==="IF")

{    traduccion +="  "+"if"
  MenuIf();
}
     
     else {


      Else();
    }}

function Else(){
i++ ;
if(Tks[i].tipo==="LLAVEABIERTA"){
 
 valelse=true;
   IfMenu();
}else{

  AgregarErToken(Tks[i].columna, Tks[i].fila, Tks[i].token, "se esperaba { para else ")

}
}




function DeclaracionId(){

  i++;
if(Tks[i].tipo==="IGUAL")
{ traduccion += Tks[i].token;

  Menu_Igual();
}

}










      function MenuConsole() {
        i++;
        if (Tks[i].tipo === "PARENTESIS_ABIERTO") {
          traduccion += "(";
          ConsolePunto();
        }

        else {
          AgregarErToken(Tks[i].columna, Tks[i].fila, Tks[i].token, "se esperaba ( para console")

        }
      }

      function ConsolePunto() {

        i++
        if (Tks[i].tipo === "COMILLAS") {

          traduccion += '\u0022' + Tks[i].token + '\u0022';
          ConsoleMas();
        }


        else if (Tks[i].tipo === "id") {

          traduccion += Tks[i].token;
          ConsoleMas();

        }
        else {
          AgregarErToken(Tks[i].columna, Tks[i].fila, Tks[i].token, "se esperaba id o  string para el console")

        }
      }
      function ConsoleMas() {
        i++;
        if (Tks[i].tipo === "MAS") {

          traduccion += ",";

          ConsolePunto();

        }

        if (Tks[i].tipo === "PARENTESIS_CERRADO") {

          traduccion += ")";
          CerradoConsole();

        }
        else if (Tks[i].tipo === "id") {
          AgregarErToken(Tks[i].columna, Tks[i].fila, Tks[i].token, "se esperaba + para concatenar el id")



        }


        else if (Tks[i].tipo === "COMILLAS") {
          AgregarErToken(Tks[i].columna, Tks[i].fila, Tks[i].token, "se esperaba + para concatenar comillas")



        }

        else if (Tks[i].tipo === "PARENTESIS_CERRADO") {
          traduccion += ")";
          CerradoConsole();

        }

        else {
          AgregarErToken(Tks[i].columna, Tks[i].fila, Tks[i].token, "incorrecto si quiere concatenar presione mas")

        }


      }

      function CerradoConsole() {

i++;
        if (Tks[i].tipo === "PUNTOYCOMA") {
         
          if(valif===true){

            IfMenu();
          }{
          Menu(); i++;
        }
        }

      }

      function MenuVariables() {

        i++;

        if (Tks[i].tipo === "id") {

          traduccion += " " + Tks[i].token;
          Digitos_Id();
        }
        else {


          AgregarErToken(Tks[i].columna, Tks[i].fila, Tks[i].token, "se esperaba token id para la varible")

        }
      }
 

      function Digitos_Id() {
        console.log(Tks[i].tipo + "siuuuuu");
        i++;

        if (Tks[i].tipo === "DIGITO") {
          traduccion += Tks[i].token; i++;
          finDeclaracion();
        }

        else {

          finDeclaracion();

        }
      }

      function finDeclaracion() {

        if (Tks[i].tipo === "IGUAL") {

          traduccion += "="; Menu_Igual();
        }
        else if (Tks[i].tipo === "COMA") {
          traduccion += ",";
          MenuVariables();
        } else if (Tks[i].tipo === "PUNTOYCOMA") {
          

          if (valif=true){
        IfMenu();
          }else{   i++;  Menu();
        }
        }
        else {

          AgregarErToken(Tks[i].columna, Tks[i].fila, Tks[i].token, "se esperaba token = o ,  para continuar la varaible")

        }

      }


      function Menu_Igual() {



        i++;


        if (Tks[i].tipo === "DIGITO") {
          traduccion += Tks[i].token;
          Menu_Int_Double();
        }

        else if (Tks[i].tipo === "COMILLAS") {

          traduccion += '\u0022' + Tks[i].token + '\u0022';
          Menu_String();
        }



        else if (Tks[i].tipo === "TRUE") {
          traduccion += Tks[i].token + " "; Fin_Variables();

        }

        else if (Tks[i].tipo === "FALSE") {
          traduccion += Tks[i].token + " "; Fin_Variables();
        }
      }


      function Fin_Variables() {

    
        if (Tks[i].tipo === "PUNTOYCOMA") {
          if (valif===true){

            IfMenu();

          }else {    i++;
          Menu();}

        }
        else {
          AgregarErToken(Tks[i].columna, Tks[i].fila, Tks[i].token, "se esperaba ; para terminar la declaracion de variables")


        }
      }


      function Menu_String() {
        i++;
        if (Tks[i].tipo === "MAS") {
          traduccion += "+"
          Menu_Igual();

        }

        else if (Tks[i].tipo === "PUNTOYCOMA") {
          i++;
          if (valif===true){

            IfMenu();

          }else {
          Menu();}

        }

        else {
          AgregarErToken(Tks[i].columna, Tks[i].fila, Tks[i].token, "se esperaba + o simbolo")

        }
      }

      function Menu_Int_Double() {
        i++;
        if (Tks[i].tipo === "MAS") {
          traduccion += "+"
          Menu_Igual();

        }
        else if (Tks[i].tipo === "MENOS") {
          traduccion += "-"
          Menu_Igual();


        } else if (Tks[i].tipo === "POR") {
          traduccion += "*"
          Menu_Igual();


        } else if (Tks[i].tipo === "BARRA") {
          traduccion += "/"
          Menu_Igual();


        }
        else if (Tks[i].tipo === "PUNTO") {
          traduccion += "."
          MenuDouble();
        }


        else if (Tks[i].tipo === "PUNTOYCOMA") {
   
          if (valif===true){

             IfMenu();

          }
          
          else if(declaracion===true){


            DeclaracionId();
          }
         
          else {       i++;
          Menu();}



        }
        else {


          AgregarErToken(Tks[i].columna, Tks[i].fila, Tks[i].token, "se esperaba token para continuar la variable int o double")

        }

      }


      function MenuDouble() {
        i++;
        if (Tks[i].tipo === "DIGITO")
          traduccion += Tks[i].token;
        Menu_Int_Double();

      }



      function COMENTARIOS() {
        i++;
        if (Tks[i].tipo === "COMENTARIO_SIMPLE") {
          traduccion += "#" + Tks[i].token;
   
          if (valif===true){
            console.log("siuuuuuas")
          
            IfMenu();
          }else {       i++;   
          Menu();}

        } else if (Tks[i].tipo === "COMENTARIO_MULTI") {
          traduccion += '\u0022' + Tks[i].token;
          FIN_COMENTARIO_COMPUESTO();

        }
        else {
          AgregarErToken(Tks[i].columna, Tks[i].fila, Tks[i].token, "se esperaba indicador para iniciar el comenatario")
        }
      }
      function FIN_COMENTARIO_COMPUESTO() {
        i++; console.log(Tks[i].token)
        if (Tks[i].tipo === "ASTERISCO") {
          traduccion += '\u0022';
          i++;
          if (Tks[i].tipo === "BARRA") {


            if (valif===true){

              IfMenu();
  
            }else {

              i++;
            Menu();}
       

          } else {
            AgregarErToken(Tks[i].columna, Tks[i].fila, Tks[i].token, "se esperaba / para terminar el comentario")

          }

        } else {
          AgregarErToken(Tks[i].columna, Tks[i].fila, Tks[i].token, "se esperaba* para terminar el comentario")

        }
      }











      // esto nos va servir para declarar metodos  ya sea el metodo main o un metodo cualquiera
      function MENU_VOID() {
        i++;
        traduccion += "  ";
        if (Tks[i].tipo === "id") {
          traduccion += Tks[i].token;
          VOID_DIGITOS();
        }
        else if (Tks[i].tipo === "MAIN") {
          traduccion += " " + "main"
          VOID_NORMAL()
        } else {
          AgregarErToken(Tks[i].columna, Tks[i].fila, Tks[i].token, "se esperaba  id para el metodo void")

        }

      }





      function VOID_DIGITOS() {
        i++;

        if (Tks[i].tipo === "DIGITO") // esto es por si vienen digitos en el id del metoodo
        {
          traduccion += Tks[i].token; console.log("digitos")
          VOID_NORMAL()
        } else {
          // sino  viene nada pues ok 
          VOID_NORMAL();
        }
      }




      function VOID_NORMAL() {
        i++;
        if (Tks[i].tipo === "PARENTESIS_ABIERTO") {
          traduccion += "(";
          DECLARACION_METODOS();

        } else {

          AgregarErToken(Tks[i].columna, Tks[i].fila, Tks[i].token, "se esperaba parentesis antes  de la declaracion del metodo ")


        }
      }

      function DECLARACION_METODOS() {
        i++;
        if (Tks[i].tipo === "INT") {

          traduccion += "var" + "  ";
          ID_DECLARACIO();
        }
        else if (Tks[i].tipo === "STRING") {

          traduccion += "var" + "  ";
          ID_DECLARACIO();
        }
        else if (Tks[i].tipo === "CHAR") {

          traduccion += "var" + "  ";
          ID_DECLARACIO();
        }
        else if (Tks[i].tipo === "BOOL") {

          traduccion += "var" + "  ";
          ID_DECLARACIO();
        }
        else if (Tks[i].tipo === "PARENTESIS_ABIERTO") {

          traduccion += ")";
          FIN_METODOS();
        } else {
          AgregarErToken(Tks[i].columna, Tks[i].fila, Tks[i].token, "se esperaba token para el metodo ")

        }


      }
      function ID_DECLARACIO() {
        i++;

        if (Tks[i].tipo === "id") {
          traduccion += Tks[i].token;


          i++;



          if (Tks[i].tipo === "COMA") {
            traduccion += ",";
            DECLARACION_METODOS();

          }

          else if (Tks[i].tipo === "PARENTESIS_CERRADO") {
            traduccion += Tks[i].token;
            FIN_METODOS();


          } else {


            AgregarErToken(Tks[i].columna, Tks[i].fila, Tks[i].token, "se esperaba indicador para terminar el metodo ")

          }
        }
      }

      function FIN_METODOS() {

        i++;

        if (Tks[i].tipo === "LLAVEABIERTA") {
          traduccion += "{";
          SENTECIA_METODO();

        }
        else {
          AgregarErToken(Tks[i].columna, Tks[i].fila, Tks[i].token, "se esperaba { para iniciar el meotod ")

        }
      }

      function SENTECIA_METODO() {
        i++;
        if (Tks[i].tipo === "BARRA") {
          COMENTARIOS()
        }
      }

    }



    return (

      <div className="App">

        <form on onSubmit={this.submitHandler}>

          <nav className="navbar navbar-dark bg-dark">

            <a className="navbar-brand" >Nuevo Archivo </a>
            {logo}
          </nav>

          <h1> <span className="badge badge-dark"> Traductor c# a Pyton
          </span>
          </h1>
          <  div className="container-fluid" align="left">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">ingrese ruta</span>
              <input type="text" className="form-control" placeholder="----" aria-label="Username" aria-describedby="addon-wrapping" name="ruta" onChange={this.changeHandler} ></input>
              <button type="submit" className="btn btn-dark">Buscar</button>
            </div>
            <  div className="container-fluid" align="left">
              <div className="row mt-3">
                <div className="card" >
                  <div className="card-body">
                    <span className="badge badge-dark">Archivo a traducir </span>
                    <h5 className="card-title"> {Data} </h5>
                  </div></div>
              </div> </div>
          </div>
        </form>
        <  div className="container-fluid" align="left">
          <div className="row mt-3">
            <div className="card" >
              <div className="card-body">
                <span className="badge badge-dark">Archivo traducido </span>
                <h5 className="card-title">{traduccion} </h5>
              </div></div>
          </div> </div>


      </div>

    );
  }
}

export default App;
