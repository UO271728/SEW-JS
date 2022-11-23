"use stric";
class CalculadoraRPN{

    constructor(){
        this.pila = new Array();
        this.actual = "0";
        this.shiftAct = new Boolean(false);
        this.inicio = true;

        document.addEventListener('keydown',(event) =>{
            this.registrarTecla(event);
        });
    }

    registrarTecla(evento){
        var tecla = evento.key;
        if(tecla == "0" || tecla == "1" || tecla == "2" || tecla == "3" || tecla == "4" || tecla == "5" || tecla == "6" || tecla == "7" || tecla == "8" || tecla == "9"){
            this.digitos(tecla);
        }
        else if(tecla == "l" && evento.altKey){
            this.ln();
        }
        else if(tecla == "s" && evento.altKey){
            this.seno();
        }
        else if(tecla =="c" && evento.altKey){
            this.coseno();
        }
        else if(tecla == "+"){
            this.suma();
        }
        
        else if(tecla == "-"){
            this.resta();
        }

        else if(tecla == "*"){
            this.multiplicacion();
        }

        else if(tecla == "/"){
            this.division();
        }

        else if(tecla == "r"){
            this.raiz();
        }

        else if(tecla == "l"){
            this.log();
        }

        else if(tecla == "c"){
            this.coseno();
        }
        else if(tecla == "h"){
            this.shift();
        }

        else if(tecla == "t"){
            this.tangente();
        }

        else if(tecla == "y"){
            this.xpotenciay();
        }

        else if(tecla == "n"){
            this.ln();
        }
        else if(tecla == "u"){
            this.potenciaCuadrado();
        }
        else if(tecla == "s"){
            this.cambioSigno();
        }
        else if(tecla == "."){
            this.punto();
        }
        else if(tecla == "Escape"){
            this.on();
        }
        else if(tecla == "Enter"){
            this.enter();
        }
        else if(tecla == "Backspace"){
            this.borrar();
        }

    }

    digitos(numero){
        if(this.inicio == false){
            this.actual+= numero
        }
        else{
            this.actual = numero;
            this.inicio = false;
        }
        this.#mostrarPantalla();
    }

    punto(){
        this.actual+=".";
    }

    log(){
        var resultado = this.#operacionEspecial("Logaritmo");
        this.pila.push(resultado)
        this.actual = "";
        this.#mostrarPantalla();
    }

    ln(){
        var resultado = this.#operacionEspecial("LogaritmoNatural");
        this.pila.push(resultado)
        this.actual = "";
        this.#mostrarPantalla();
    }

    potenciaCuadrado(){
        var resultado = this.#operacionEspecial("PotenciaCuadrado");
        this.pila.push(resultado)
        this.actual = "";
        this.#mostrarPantalla();
    }

    xpotenciay(){
        var resultado = this.#operacionEspecial("xpotenciay");
        this.pila.push(resultado)
        this.actual = "";
        this.#mostrarPantalla();
    }

    shift(){
        if(this.shiftAct == false){
            this.shiftAct = true;
            document.querySelector("input[name='sin']").setAttribute('value','sec');
            document.querySelector("input[name='cos']").setAttribute('value','csc');
            document.querySelector("input[name='tan']").setAttribute('value','cot');
        }
        else{
            this.shiftAct = false;
            document.querySelector("input[name='sin']").setAttribute('value','sin');
            document.querySelector("input[name='cos']").setAttribute('value','cos');
            document.querySelector("input[name='tan']").setAttribute('value','tan');
        }
    }

    resta(){
        var resultado = this.#operacionBasica("+");
        this.pila.push(resultado)
        this.actual = "";
        this.#mostrarPantalla();
    }

    suma(){
        var resultado = this.#operacionBasica("+");
        this.pila.push(resultado)
        this.actual = "";
        this.#mostrarPantalla();
    }

    multiplicacion(){
        var resultado = this.#operacionBasica("*");
        this.pila.push(resultado)
        this.actual = "";
        this.#mostrarPantalla(); 
    }

    division(){
        var resultado = this.#operacionBasica("/");
        this.pila.push(resultado)
        this.actual = "";
        this.#mostrarPantalla();
    }

    raiz(){
        var resultado = this.#operacionEspecial("raiz");
        this.pila.push(resultado);
        this.actual = "";
        this.#mostrarPantalla();
    }

    on(){
        this.pila = new Array();
        this.actual = "0";
        this.shiftAct = new Boolean(false);
        this.inicio = true;
        this.#mostrarPantalla();
    }

    borrar(){
        if(this.actual >1){
            this.actual = this.actual.substring(0,this.actual.length -1);
        }
        else if(this.actual ==1 && this.actual != "0"){
            this.actual = "0";
        }
        this.#mostrarPantalla();
    }

    seno(){
        if(this.shiftAct == false){
            var resultado = this.#operacionEspecial("Seno");
        }
        else{
            var resultado = this.#operacionEspecial("Secante");
        }
        this.pila.push(resultado);
        this.actual = "";
        this.#mostrarPantalla();
    }

    coseno(){
        if(this.shiftAct == false){
            var resultado = this.#operacionEspecial("Coseno");
        }
        else{
            var resultado = this.#operacionEspecial("Cosecante");
        }
        this.pila.push(resultado);
        this.actual = "";
        this.#mostrarPantalla();
    }

    tangente(){
        if(this.shiftAct == false){
            var resultado = this.#operacionEspecial("Tangente");
        }
        else{
            var resultado = this.#operacionEspecial("Cotangente");
        }
        this.pila.push(resultado);
        this.actual = "";
        this.#mostrarPantalla();
    }

    cambioSigno(){
        if(Number(this.actual)>0){
            this.actual="-"+this.actual;
        }
        else{
            this.actual=this.actual.substring(1,this.actual.length);
        }
        this.#mostrarPantalla();
    }

    enter(){
        this.pila.push(this.actual);
        this.#mostrarPantalla();
        this.inicio = true;
        this.actual = "";
    }

    #mostrarPantalla(){
        var pantallaFinal = "";
        for(var i in this.pila){
            pantallaFinal+=Number(i)+1+": \t \t "+this.pila[i]+"\n";
        }
        pantallaFinal+=(this.pila.length+1)+": \t \t "+this.actual;
        document.getElementsByTagName("textarea").item(0).value = pantallaFinal;
    }

    #operacionBasica(operador){
        var operador1 = this.pila.pop();
        var operador2 = this.pila.pop();
        switch(operador){
            case "+":
                return Number(operador2) + Number(operador1);
            case "-":
                return Number(operador2) - Number(operador1);
            case "*":
                return Number(operador2) * Number(operador1);
            case "/":
                return Number(operador2) / Number(operador1);
        }
    }

    #operacionEspecial(operador){
        var operando = this.pila.pop();
        if(operador != "xpotenciay" && operador !="raiz"){
            return this.#buscarFuncion(operador,operando);
        }
        else{
            var operando2 = this.pila.pop();
            if(operador == "xpotenciay"){
                return Math.pow(Number(operando),Number(operando2));
            }
            else{
                var operando3 = this.pila.pop();
                var resultado = Number(operando2)/Number(operando);
                return Math.pow(Number(operando3),Number(resultado));
            }
        }
    }

    #buscarFuncion(operador,operando){
        switch(operador){
            case "Logaritmo":
                return Math.log10(Number(operando));
            case "PotenciaCuadrado":
                return Math.pow(Number(operando),2);
            case "LogaritmoNatural": 
                return Math.log2(Number(operando));
            case "Seno":
                return Math.sin(Number(operando)); 
            case "Coseno":
                return Math.cos(Number(operando));
            case "Tangente":
                return Math.tan(Number(operando));
            case "Secante":
                return Math.asin(Number(operando));
            case "Cosecante":
                return Math.acos(Number(operando));
            case "Cotangente":
                return Math.atan(Number(operando));
        }
    }
}

class CalculadoraEnergetica extends CalculadoraRPN{

    constructor(){
        super();
        this.precioKwh ="0.3071";
        this.nPersonas="2";
    }

    registrarTecla(evento){
        var tecla = evento.key;
        if(tecla == "0" || tecla == "1" || tecla == "2" || tecla == "3" || tecla == "4" || tecla == "5" || tecla == "6" || tecla == "7" || tecla == "8" || tecla == "9"){
            this.digitos(tecla);
        }
        else if(tecla == "l" && evento.altKey){
            this.ln();
        }
        else if(tecla == "s" && evento.altKey){
            this.seno();
        }
        else if(tecla =="c" && evento.altKey){
            this.coseno();
        }
        else if(tecla =="t" && evento.altKey){
            this.television();
        }
        else if(tecla =="n" && evento.altKey){
            this.horno();
        }
        else if(tecla =="d" && evento.altKey){
            this.radiador();
        }
        else if(tecla =="e" && evento.altKey){
            this.calentador();
        }
        else if(tecla == "p" && evento.altKey){
            this.precio();
        }
        else if(tecla == "m"){
            this.consumo();
        }
        else if(tecla == "+"){
            this.suma();
        }
        
        else if(tecla == "-"){
            this.resta();
        }

        else if(tecla == "*"){
            this.multiplicacion();
        }

        else if(tecla == "/"){
            this.division();
        }

        else if(tecla == "r"){
            this.raiz();
        }

        else if(tecla == "l"){
            this.log();
        }

        else if(tecla == "c"){
            this.coseno();
        }
        else if(tecla == "h"){
            this.shift();
        }

        else if(tecla == "t"){
            this.tangente();
        }

        else if(tecla == "y"){
            this.xpotenciay();
        }

        else if(tecla == "n"){
            this.ln();
        }
        else if(tecla == "u"){
            this.potenciaCuadrado();
        }
        else if(tecla == "s"){
            this.cambioSigno();
        }
        else if(tecla == "."){
            this.punto();
        }
        else if(tecla == "o"){
            this.ordenador();
        }
        else if(tecla == "v"){
            this.lavavajillas();
        }
        else if(tecla == "i"){
            this.iluminacion();
        }
        else if(tecla == "p"){
            this.nPersonas();
        }
        else if(tecla == "Escape"){
            this.on();
        }
        else if(tecla == "Enter"){
            this.enter();
        }
        else if(tecla == "Backspace"){
            this.borrar();
        }

    }

    consumo(){
        var totalConsumido= 0;
        var totalPrecio= 0;
        if(this.pila.length >1){
            while(this.pila.length >0){
                var operando =this.pila.pop();
                if(this.#no_es_consumo(operando)){
                    var partes = operando.split(":");
                    var consumido = this.#calcularConsumido(partes[1],partes[2]);
                    if(partes[0] == "calentador"){
                        consumido = consumido * Number(this.nPersonas);
                    }
                    var dinero = consumido * Number(this.precioKwh);
                    totalPrecio += dinero;
                    totalConsumido += consumido;
                }
            }
            this.#mostrarConsumo(totalConsumido,totalPrecio);
        }
    }

    #calcularConsumido(tiempo,vatios){
        var tiempoCompleto = Number(tiempo)/60;
        var kilovatios = Number(vatios)/1000;
        return tiempoCompleto * Number(kilovatios)*30;
    }

    ordenador(){
        this.#operacionConsumo("ordenador");
    }

    television(){
        this.#operacionConsumo("television");
    }

    horno(){
        this.#operacionConsumo("horno");
    }

    lavavajillas(){
        this.#operacionConsumo("lavavajillas");
    }

    radiador(){
        this.#operacionConsumo("radiador");
    }

    calentador(){
        this.#operacionConsumo("calentador");
    }

    iluminacion(){
        this.#operacionConsumo("iluminacion");
    }


    #operacionConsumo(operador){
        if(this.pila.length >=2 && this.#no_es_consumo()){
            var minutos = this.pila.pop();
            var vatios = this.pila.pop();
            if(operador != "calentador"){
                var resultado = operador+":"+minutos+":"+vatios;
            }else{
                var resultado = operador+":"+minutos+":"+vatios+":"+this.nPersonas+"_personas";
            }
            this.pila.push(resultado);
            this.#mostrarPantalla();
        }
    }

    #no_es_consumo(){
        return true;
    }

    numeroPersonas(){
        var personas = this.pila.pop();
        if(Number(personas)>=1){
            this.nPersonas = personas;
        }
    }

    añadirPrecio(){
        if(this.pila.length >=1){
            this.precio = this.pila.pop()
        }
    }

    #mostrarPantalla(){
        var pantallaFinal = "";
        for(var i in this.pila){
            pantallaFinal+=Number(i)+1+":\t"+this.pila[i]+"\n";
        }
        pantallaFinal+=(this.pila.length+1)+":\t"+this.actual;
        document.getElementsByTagName("textarea").item(0).value = pantallaFinal;
    }

    #mostrarConsumo(consumido,precio){
        var cadenaFinal = "Consumido: "+consumido+" KWh - Precio: "+precio+" €";
        document.getElementsByTagName("textarea").item(0).value = cadenaFinal;
    }

    on(){
        this.pila = new Array();
        this.actual = "0";
        this.shiftAct = new Boolean(false);
        this.inicio = true;
        this.nPersonas = "2";
        this.precioKwh = "0.54";
        this.#mostrarPantalla();
    }
}