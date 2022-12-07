"use stric"
class MapaKML{
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
        if(file[0].name.split(".")[1] != "kml"){
            var str = "Error: Archivo de tipo distinto a KML";
            $("input").after("<p name=\"Error\">"+str+"</p>");
            return;
        }
        $("p[name='Error']").remove();
        $("main").empty();
        var lector = new FileReader();
        lector.onload = function(archivo){
            var centro = {lat: 43.35557020422213,  lng:-5.851232984659246};
            var mapaGeoposicionado = new google.maps.Map(document.getElementsByTagName('main')[0],{
                zoom:5,
                center:centro,
            });
            var xmlParseado = $.parseXML(lector.result);
            var puntos = $(xmlParseado).find('Placemark');
            var infoWindow = new google.maps.InfoWindow;
            Array.from(puntos).forEach(element =>{
                var point =  $(element).find("Point")[0];
                var description = $(element).find("description").text();
                var coordenadas = $(point).find("coordinates")[0].lastChild.data;
                coordenadas = coordenadas.substring(1,coordenadas.length-2);
                var coordenadasSplit = coordenadas.split(",");
                var pos = {lat: Number(coordenadasSplit[1]),lng:Number(coordenadasSplit[0])};

                var marcador = new google.maps.Marker({position:pos,map:mapaGeoposicionado})
                marcador.setTitle(description);
            });
        }
        lector.readAsText(file[0]);
    }

}
var mapaKML = new MapaKML();