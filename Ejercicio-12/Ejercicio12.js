"use strict"
class AnalizadorArchivos{
    constructor(){
        this.tipos = ["text/plain","text/xml","application/json"]
    }
    
    analizarArchivos(files){
        $("main").empty();
        Array.from(files).forEach(element => {
            var str = "<section>";
            str+= "<h2> Archivo "+element.name+"</h2>";
            str += "<p> Nombre del archivo: "+element.name+" </p>";
            str += "<p> Tamaño del archivo: "+element.size+" </p>";
            str += "<p> Tipo del archivo: "+element.type+" </p>";
            str += "<p> Ultima modificacion del archivo: "+element.lastModifiedDate+" </p>";
            if(this.tipos.includes(element.type)){
                var lector = new FileReader();
                lector.onload = function (evento){
                    if(element.type == "text/xml")
                        str += "<h2>Contenido:</h3><textarea>"+lector.result+"</textarea>"
                    else{
                        str += "<h2>Contenido:</h3><pre>"+lector.result+"</pre>"    
                    }
                    str += "</section>"
                    $("main").last().append(str);
                }
                lector.readAsText(element);
                
            }
            else{
                $("main").last().append(str);
                var error = "Error al leer el archivo, el tipo del archivo es incompatible";
            }

        });
    }
}