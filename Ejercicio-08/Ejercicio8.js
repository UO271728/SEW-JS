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
        for(let lugar of this.lugares.entries()){
            var coordenada = lugar[1];
            var i = 0;
            $.ajax({
                dataType: "json",
                url:this.url+"lat="+coordenada[0]+"&lon="+coordenada[1]+"&units=metric&lang=es&appid="+this.apiKey,
                method: 'GET',
                success:function(data){
                    var str = "<section><h2>"+data.name+"</h2>";
                    str += "<ul><li>Tiempo: "+data.weather[0].main+"</li>\n";
                    str+= "<li>Descripcion: "+data.weather[0].description+"</li>\n";
                    str+= "<li>Temperatura: "+data.main.temp+" grados</li>";
                    str+= "<li>Sensacion Termica: "+data.main.feels_like+" grados</li>";
                    str+= "<li>Temperatura minima: "+data.main.temp_min+" grados</li>";
                    str+= "<li>Temperatura máxima: "+data.main.temp_max+" grados</li>";
                    str+= "<li>Velocidad del viento: "+data.wind.speed+" m/s</li>";
                    str+= "<li>Dirección del viento: "+data.wind.deg+" grados</li>";
                    str+= "<li>Presion: "+data.main.pressure+" milimetros</li>";
                    str+= "<li>Humedad: "+data.main.humidity+"</li>";
                    str+= "<li>Visibilidad: "+data.visibility+" metros</li>";
                    str+= "<li>Nubosidad: "+data.cloud+"%</li>";
                    str+= "<li>Hora a la que amanecerá: "+ new Date(data.sys.sunrise * 1000).toLocaleTimeString()+"</li>";
                    str+= "<li>Hora a la que anochecerá: "+ new Date(data.sys.sunset * 1000).toLocaleTimeString()+"</li>";
                    str+= "</ul>";
                    str+= "<img src=\"https://openweathermap.org/img/w/"+data.weather[0].icon+".png\" alt=\"Condicion del clima para "+data.name+"\"></section>"
                    $("main").last().append(str);
                    i++;

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