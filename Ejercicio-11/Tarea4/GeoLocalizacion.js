"use stric"
class GeoLocalizacion{
    constructor(){
    }

    /**
     * Creará un mapa dinamico con centro y marcador en EII
     */
    definirMap(){
        var escuela = {lat: 43.35557020422213,  lng:-5.851232984659246}
        var mapaEscuela = new google.maps.Map(document.getElementsByTagName("main")[0],{zoom:10,center:escuela});
        var marcador = new google.maps.Marker({position:escuela,map:mapaEscuela});
    }

    
}

var geoLocation = new GeoLocalizacion();