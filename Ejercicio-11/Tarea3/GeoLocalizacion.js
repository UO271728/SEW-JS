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
        let latitud = posicion.coords.latitude;
        let longitud = posicion.coords.longitude;
        let apiKey = "&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU";
        let url = "https://maps.googleapis.com/maps/api/staticmap?";
        let centro = "center="+latitud+","+longitud;
        let zoom = "&zoom=10";
        let tamaño = "&size=800x600";
        let marcador="&markers=color:red%7Clabel:S%7C"+ latitud + ","+longitud;
        let sensor = "&sensor=false";
        let mapaEstatico = url + centro + zoom + tamaño + marcador + sensor + apiKey;
        $("main").append("<img src='"+mapaEstatico+"' alt='mapa estatico'/>");
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
                break;

        }
        $("main").append("<h2>Error</h2>");
        $("h2").after(str);
    }



}