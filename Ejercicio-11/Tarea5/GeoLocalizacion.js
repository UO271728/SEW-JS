"use stric"
class GeoLocalizacion{
    constructor(){
    }

    
    definirMap(){
        var centro = {lat: 43.35557020422213,  lng:-5.851232984659246};
        var mapaGeoposicionado = new google.maps.Map(document.getElementsByTagName('main')[0],{
            zoom:15,
            center:centro,
        });

        var infoWindow = new google.maps.InfoWindow;
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
                var pos={
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent('Posicion actual');
                infoWindow.open(mapaGeoposicionado);
                mapaGeoposicionado.setCenter(pos);
            }, function(){
                handleError(true,infoWindow,mapaGeoposicionado.getCenter());
            });
        }else{
            handleError(false, infoWindow, mapaGeoposicionado.getCenter());
        }
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