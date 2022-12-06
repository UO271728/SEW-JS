"use stric"
class Meteosat{

    constructor(){
        this.apiKey = "e792e9e2343ac17130286cc41c620609";
        this.codigoPais=  "ES";
        this.lugares = new Map();
        this.url = "https://api.openweathermap.org/data/2.5/weather?";
        this.#cargarLugares();
    }

    cargarTiempos(){
        var i = 0;
        for(let lugar of this.lugares.entries()){
            var coordenada = lugar[1];
            $.ajax({
                dataType: "xml",
                url:this.url+"lat="+coordenada[0]+"&lon="+coordenada[1]+"&units=metric&mode=xml&lang=es&appid="+this.apiKey,
                method: 'GET',
                success:function(data){
                    var clima = $('weather',data).attr("value");
                    clima = clima[0].toUpperCase() + clima.substring(1);
                    
                    var amanece= $('sun',data).attr("rise");
                    var minutosZonaHoraria = new Date().getTimezoneOffset();
                    var amanecerMiliSeg1970 = Date.parse(amanece);
                    amanecerMiliSeg1970 -= minutosZonaHoraria *60 * 1000;
                    var amaneceLocal = (new Date(amanecerMiliSeg1970)).toLocaleTimeString("es-ES");

                    var oscurece= $('sun',data).attr("set");
                    var oscucerMiliSeg1970 = Date.parse(oscurece);
                    oscucerMiliSeg1970 -= minutosZonaHoraria *60 * 1000;
                    var oscureceLocal = (new Date(oscucerMiliSeg1970)).toLocaleTimeString("es-ES");

                    var temperatura = $('temperature',data).attr("value");
                    var temperatura_min = $('temperature',data).attr("min");
                    var temperatura_max = $('temperature',data).attr("max");
                    var sensacion_termica = $('feels_like',data).attr("value");
                    var temperatura_unidades = $('temperature',data).attr("unit");
                    var humedad = $('humidity',data).attr("value");
                    var humedad_unidad = $('humidity',data).attr("unit");
                    var presion = $('pressure', data).attr("value");
                    var presion_unidades = $('pressure',data).attr("unit");
                    var viento_nombre = $('direction',data).attr("name");
                    var velocidadViento = $('speed',data).attr("value");
                    var velocidadVientoUnidad = $('speed',data).attr("unit");
                    var velocidad_nombre = $('speed',data).attr("name");
                    var direccionViento = $('direction',data).attr("code");
                    var visibilidad = $('visibility',data).attr("value");
                    var precipitaciones = $('precipitation',data).attr("mode");
                    var nubosidad = $('clouds',data).attr("value");
                    var nubosidad_nombre = $('clouds',data).attr("name");
                    var icon = $('weather',data).attr("icon");
                    var name = $('city',data).attr("name");

                    var str = "<section><h2>"+name+"</h2>"
                    str+= "<ul><li>Tiempo: "+clima+"</li>";
                    str+= "<li> Amanace: "+ amaneceLocal+"</li>";
                    str+= "<li> Oscure: "+ oscureceLocal+"</li>";
                    str+= "<li>Temperatura: "+temperatura +" "+ temperatura_unidades+"</li>";
                    str+= "<li>Sensacion Termica: "+sensacion_termica +" "+ temperatura_unidades+"</li>";
                    str+= "<li>Temperatura minima: "+temperatura_min +" "+ temperatura_unidades+"</li>";
                    str+= "<li>Temperatura máxima: "+temperatura_max +" "+ temperatura_unidades+"</li>";
                    str+= "<li>Precipitaciones para hoy: "+precipitaciones+"</li>";
                    str+= "<li>Nubosidad: "+nubosidad+"</li>";
                    str+= "<li>Nombre nubosidad: "+nubosidad_nombre+"</li>";
                    str+= "<li>Humedad: "+humedad +" "+ humedad_unidad+"</li>";
                    str+= "<li>Presion: "+presion +" "+ presion_unidades+"</li>";
                    str+= "<li>Viento: "+velocidad_nombre +" "+ velocidadViento +" "+ velocidadVientoUnidad +" "+ viento_nombre +" "+ direccionViento+"</li>";
                    str+= "<li>Visibilidad: "+visibilidad+"</li>";
                    str+= "</ul>";
                    str+= "<img src=\"https://openweathermap.org/img/w/"+icon+".png\" alt=\"Condicion del clima para "+name+"\"></section>"
                    $("main").last().append(str);

                },
                error: function(){
                    console.log();
                }

            })
        }
    }


    #cargarLugares(){
        this.lugares.set("Colloto",[43.379922,-5.804361]);
        this.lugares.set("Cudillero",[43.563323,-6.145806])
        this.lugares.set("Lastres",[43.513519,-5.269754])
        this.lugares.set("Felechosa",[43.104401,-5.505904])
        this.lugares.set("Llanes",[43.421121,-4.753084])
    }
}