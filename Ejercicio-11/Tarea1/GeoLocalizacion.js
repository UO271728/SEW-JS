"use stric"
class GeoLocalizacion{
    constructor(){
        this.longitud = "";
        this.latitud="";
        this.altitud="";
    }

    calcularPosicion(){
        $("p").remove();
        $("input").remove();
        navigator.geolocation.getCurrentPosition(this.#crearMapa.bind(this));
    }

    #crearMapa(posicion){
        let str = "<p>Datos de su posición actual</p><ul><li>Longitud: "+ posicion.coords.longitude +" grados</li>";
        str+= "<li>Latitud: "+ posicion.coords.latitude+" grados</li>";
        str+= "<li>Precision: "+posicion.coords.accuracy+" grados</li>";
        str+= "<li>Altitud: "+posicion.coords.altitude+" grados</li>";
        str+= "<li>Precision de la altitud: "+posicion.coords.altitudeAccuracy+" grados</li>";
        str+= "<li>Rumbo: "+posicion.coords.heading;
        str+= "<li>Velocidad: "+posicion.coords.speed;
        $("main").append(str);
    }




}