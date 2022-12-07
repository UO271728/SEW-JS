"use stric"
class Ejercicio14{
    constructor(){
        this.amistades = new Map();
        this.posActual = {};
        this.activateGeoLocation = false;
    }

    drag(evento){
        evento.preventDefault();
    }
    
    drop(evento){
        $("main").empty();
        evento.preventDefault();
        if (evento.dataTransfer.items) {
            var item = evento.dataTransfer.items[0]
            if (item.kind === 'file') {
                var file = item.getAsFile();
                var tipo = file.name.split(".")[1]
                if(tipo== "kml"){
                    var lector = new FileReader();
                    lector.onload = function(evento){
                        var kmlParseado = $.parseXML(lector.result);
                        var puntos = $(kmlParseado).find('Placemark');
                        ej14.localizacion(puntos);
                    }
                    lector.readAsText(file)
                } else{

                }
            }
        }
    }


    localizacion(puntos){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(posicion){
                var posActual={
                    lat: posicion.coords.latitude,
                    lng: posicion.coords.longitude
                };
                ej14.setPosicion(posActual,true)
                ej14.procesarPuntos(puntos);
            }, function(){
                var posActual = {lat: 43.35557020422213,  lng:-5.851232984659246};
                ej14.setPosicion(posActual,false)
                ej14.procesarPuntos(puntos);
            });
        }
        else{
            this.posActual = {lat: 43.35557020422213,  lng:-5.851232984659246};
            this.activateGeoLocation = false;
            this.procesarPuntos(puntos);
        }
    }

    procesarPuntos(puntos){
        var i = 0;
        Array.from(puntos).forEach(punto =>{
            var description = $(punto).find("description").text();
            if((description.startsWith("Residencia")) &&(i!=0)){
                var point =  $(punto).find("Point")[0];
                var coordenadas = $(point).find("coordinates")[0].lastChild.data;
                coordenadas = coordenadas.substring(1,coordenadas.length-2);
                var amistad = $(punto).find("name").text();
                var coordenadassplit = coordenadas.split(",");
                var posicionAmigo = {lat: Number(coordenadassplit[1]),lng:Number(coordenadassplit[0])};
                var distancia = this.calcularDistancia(this.posActual,posicionAmigo);
                this.amistades.set(distancia,amistad);
            }
            i++;
        });
        this.ordenarAmigos();
    }

    setPosicion(posActual,bool){
        this.posActual = posActual;
        this.activateGeoLocation = bool;
    }

    ordenarAmigos(){
        var ordenado = this.amistades.keys();
        ordenado = Array.from(ordenado).sort(function(a,b){return a-b});
        var lugar = "";
        if(this.activateGeoLocation == true){
            lugar = "tu posición";
        }else{
            lugar = "la escuela";
        }
        ordenado.forEach(distancia =>{
            var amistad = this.amistades.get(distancia)
            var str = "<section><h2>"+amistad+"</h2><p>Se encuentra a "+distancia+" km de "+lugar+"</p></section>"
            $("main").append(str);
        });
    }

    findAmigo(value){
        return Object.keys(this.amistades).find(key => this.amistades.get(key) === value);
    }

    calcularDistancia(posActual,posicionAmigo) 
    {
      var R = 6371; // km
      var dLat = this.#toRad(posicionAmigo.lat-posActual.lat);
      var dLon = this.#toRad(posicionAmigo.lng-posActual.lng);
      var lat1 = this.#toRad(posActual.lat);
      var lat2 = this.#toRad(posicionAmigo.lat);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

    // Converts numeric degrees to radians
    #toRad(Value) 
    {
        return Value * Math.PI / 180;
    }
}
var ej14 = new Ejercicio14();