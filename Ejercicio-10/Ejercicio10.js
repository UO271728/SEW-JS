"use stric"
class Comparadora{

    constructor(){
        this.apiKey = "?access_key=642u5n0pmhbjp04ovsoxznz28ezl09rcryfylmsr15pf2he6z53l3q9eo4on";
        this.url = "https://metals-api.com/api/";
        this.symbol = "symbols=XAU,XAG,XRH,XPD,LCO";
        this.base = "base=EUR";
        this.fecha = "";
    }

    cambiarFecha(fecha){
        if(new Date(fecha).getTime() <= new Date().getTime()){
            this.fecha = fecha;
            $.ajax({
                datatype: "json",
                url: this.url+this.fecha+this.apiKey+"&"+this.base+"&"+this.symbol,
                method: 'GET',
                success:function(data){
                    var str = "<p> ORO: "+data.rates.XAU+"€ por unidad de onza</p>";
                    str+= "<p> PLATA: "+data.rates.XAG+"€ por unidad de onza</p>";
                    str+= "<p> RODIO: "+data.rates.XRH+"€ por unidad de onza</p>";
                    str+= "<p> PALADIO: "+data.rates.XPD+"€ por unidad de onza</p>";
                    str+= "<p> COBALTO: "+data.rates.LCO+"€ por unidad de onza</p>";
                    $("main").append(str);
                }
            })
        }
        else{
            $("main").append("ERROR: Fecha posterior al dia actual");
        }
    }

}

var comparadora = new Comparadora();
