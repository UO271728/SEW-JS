"use stric"
class GeoLocalizacion{
    constructor(){
        this.url =  "https://nominatim.openstreetmap.org/search?q=";
        this.apiKey = "e792e9e2343ac17130286cc41c620609";
        this.mapaGeoposicionado = null;
    }

    
    definirMap(){
        var centro = {lat: 43.35557020422213,  lng:-5.851232984659246};
        this.mapaGeoposicionado = new google.maps.Map(document.getElementsByTagName('main')[0],{
            zoom:18,
            center:centro,
            
        });
    }

    mostrarMapa(){
        var calle = document.getElementsByTagName("input")[0].value;
        this.#buscarCoordenadas(calle);
    }


    #buscarCoordenadas(calle){
        $.ajax({
            dataType: "json",
            url:this.url+calle+"&format=json",
            method: 'GET',
            success:function(data){
                geoLocation.cambiarMapa(data);
            }
        })
    }

    cambiarMapa(data){
        var localizacion = {lat: Number(data[0].lat), lng: Number(data[0].lon)}
        var infoWindow = new google.maps.InfoWindow;
        infoWindow.setPosition(localizacion);
        infoWindow.setContent(data[0].display_name);
        infoWindow.open(this.mapaGeoposicionado);
        this.mapaGeoposicionado.setCenter(localizacion)
    }

    handleError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: Ha fallado la geolocalización' :
                              'Error: Su navegador no soporta geolocalización');
        infoWindow.open(mapaGeoposicionado);
    }
}

var geoLocation = new GeoLocalizacion();