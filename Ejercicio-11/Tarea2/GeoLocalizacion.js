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
        navigator.geolocation.getCurrentPosition(this.#crearMapa.bind(this),this.#tratarErrores.bind(this));
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

    #tratarErrores(error){
        var str = "";
        switch(error.code){
            case error.TIMEOUT:
                srt = "Ha caducado la petición."
                break;
            case error.PERMISSION_DENIED:
                str = "No se puede mostrar la ubicacion actual pues no permite la peticion."
                break;
            case error.POSITION_UNAVAILABLE:
                str = "No se puede acceder a su posición";
                break;
            case error.UNKNOWN_ERROR:
                str = "Se ha producido un error desconocido";

        }
        $("main").append("<h2>Error</h2>");
        $("h2").after(str);
    }



}