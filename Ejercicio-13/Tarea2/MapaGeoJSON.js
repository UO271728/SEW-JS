"use stric"
class MapaJSON{
    constructor(){
    }

    definirMap(){
        var centro = {lat: 43.35557020422213,  lng:-5.851232984659246};
        var mapaGeoposicionado = new google.maps.Map(document.getElementsByTagName('main')[0],{
            zoom:15,
            center:centro,
        });
    }

    definirMapaRedSocial(file){
        if(file[0].name.split(".")[1] != "GeoJSON"){
            var str = "Error: Archivo de tipo distinto a KML";
            $("input").after("<p name=\"Error\">"+str+"</p>");
            return;
        }
        $("main").empty();
        var lector = new FileReader();
        lector.onload = function(archivo){
            var centro = {lat: 43.35557020422213,  lng:-5.851232984659246};
            var mapaGeoposicionado = new google.maps.Map(document.getElementsByTagName('main')[0],{
                zoom:5,
                center:centro,
            });
            var jsonParseado = $.parseJSON(lector.result);
            Array.from(jsonParseado.features).forEach(element =>{
                var point =  element.geometry.coordinates;
                var description = element.properties.Description;
                var pos = {lat: Number(point[1]),lng:Number(point[0])};
                var marcador = new google.maps.Marker({position:pos,map:mapaGeoposicionado})
                marcador.setTitle(description);
            });
        }
        lector.readAsText(file[0]);
    }
}
var mapaJSON = new MapaJSON();