export default class Tokens{

constructor(id , columna, fila, token, tipo){

    this.columna= columna;

    this.fila= fila;
    this.id= id;
    this.token= token;
    this.tipo= tipo;

}
  getID(){

    return this.id;


}
getColumna(){

    return this.columna;

    
}
getFila(){

    return this.fila;

    
}
getToken(){

    return this.token;

    
}getTipo(){

    return this.tipo;

    
}
}
