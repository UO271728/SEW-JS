"use stric";
class Calculadora{

    constructor (){
        this.memory="";
        this.operando1="0";
        this.operando2="";
        this.operator="";
        this.action="";
        this.i = 0;
        
        document.addEventListener('keydown',(event) =>{
            this.registrarTecla(event.key);
        });
    }

    registrarTecla(tecla){
        if(tecla == "0" || tecla == "1" || tecla == "2" || tecla == "3" || tecla == "4" || tecla == "5" || tecla == "6" || tecla == "7" || tecla == "8" || tecla == "9"){
            this.digitos(tecla);
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

        else if(tecla == "."){
            this.punto();
        }

        else if (tecla =="%"){
            this.porcentaje();
        }

        else if(tecla == "r"){
            this.raiz();
        }

        else if(tecla == "="){
            this.igual();
        }

        else if(tecla == "Escape"){
            this.on();
        }
        else if(tecla == "Enter"){
            this.igual();
        }
    }

    digitos(numero){
        if(this.action != "igual"){
            if(this.operator!=""){
                if(this.operando2[0] == '0'){
                    this.operando2 = numero;
                }
                else{
                    this.operando2+= numero;
                }
                this.mostrarPantalla(this.operando2);
            }
            else{
                if(this.operando1[0] == '0'){
                    this.operando1 = numero;
                }
                else{
                    this.operando1+= numero;
                }
                this.mostrarPantalla(this.operando1);
            }
        }else{
            this.operando1 = numero;
            this.operando2 = "";
            this.operator = "";
            this.mostrarPantalla(this.operando1);
        }
            this.action ="digito";

    }

    punto(){
        this.action="punto"
        if(this.operator!=""){
            if(this.operando2.substring(this.operando2.length -1)!='.'){
                this.operando2+='.';
                this.mostrarPantalla(this.operando2);
            }
        }
        else{
            if(this.operando1.substring(this.operando1.length -1)!='.'){
                this.operando1+='.';
               this.mostrarPantalla(this.operando1);
            }
        }
    }

    suma(){
        this.operacionesBasicas('+');
        this.action = "suma";
    }

    resta(){
        this.operacionesBasicas('-');
        this.action = "resta";
    }

    multiplicacion(){
        this.operacionesBasicas('*');
        this.action = "multiplicacion";
    }

    division(){
        this.operacionesBasicas('/');
        this.action = "division";
    }

    operacionesBasicas(operador){
        if(this.operando2!=""){
            this.igual();
        }
        this.operator=operador;
        this.operando2="";
    }

    mostrarPantalla(cadena){
        document.getElementById("pantalla").value = cadena;
    }

    mrc(){
        if(this.action == "mrc"){
            this.mostrarPantalla(this.memory);
            this.operando1 = "";
            this.memory = "0";
        }
        else{
            this.action ="mrc";
            this.operando1 = this.memory;
            this.mostrarPantalla(this.operando1);
        }
    }

    mMenos(){
        if(this.operando2!=""){
            this.igual();
        }
        this.memory= Number(this.memory) - Number(this.operando1);
    }

    mMas(){
        if(this.operando2!=""){
            this.igual()
        }
        this.memory= Number(this.operando1)+ Number(this.memory);
    }

    igual(){
        try{
            if(this.action == "digito"){
                this.action = "igual";
            }
            if(this.operator =="*" && this.operando2==""){
                this.operando2 = this.operando1;
            }
            if(this.operator=="/" && this.operando2==""){
                this.operando2 = this.operando1;
                this.operando1 = '1'
            }
            if(this.operando2!=""){
                var resultado = eval(this.operando1+""+this.operator+""+this.operando2);
                this.mostrarPantalla(Number(resultado));
                this.operando1 = resultado;
            }

        } catch (error){
            console.log("Error "+error)
        }
    }

    porcentaje(){
        this.action="porcentaje";
        if(this.operando1!="" && this.operando2!=""){
            var percentage = (Number(this.operando2)/100)*Number(this.operando1);
            this.operando2 = percentage;
            this.igual()
        }
    }

    raiz(){
        if(this.action=="igual" || this.operando2==""){
            var resultado = Math.sqrt(Number(this.operando1))
            this.operando1 = resultado;
            this.operator="";
            this.operando2="";
            this.mostrarPantalla(resultado);
        }
        else{
            this.action = "raiz";
            var resultado = Math.sqrt(Number(this.operando2))
            this.operando2 = resultado;
            this.mostrarPantalla(resultado);
            
        }
    }

    cambioSigno(){
        if(this.operando2 != ""){
            if(Number(this.operando2)>0){
                this.operando2= '-'+this.operando2;
            }
            else{
                this.operando2 = this.operando2.substring(1,this.operando2.length)
            }
            this.mostrarPantalla(this.operando2);
        }
        else{
            if(Number(this.operando1)>0){
                this.operando1= '-'+this.operando1;
            }
            else{
                this.operando1 = this.operando1.substring(1,this.operando1.length)
            }
            this.mostrarPantalla(this.operando1);
        }
        this.action = "cambioSigno";
    }

    on(){
        this.operando1 = "";
        this.operator = "";
        this.operando2 = "";
        this.action= "";
        this.mostrarPantalla('0');
    }

    ce(){
        if(this.operando2!=""){
            this.operando2 = "0";
            this.mostrarPantalla('0');
        }
        else{
            this.on();
        }
        
    }
}

"use strict";
class CalculadoraCientifica extends Calculadora{

    constructor(){
        super();
        this.cadena="";
        this.pantalla="";
        this.unidades="";
        this.flechaAct = new Boolean(false);
        this.feAct = false;
        this.unidades = ["DEG","RAD","GRAD"];
    }

    registrarTecla(tecla){
        if(tecla == "0" || tecla == "1" || tecla == "2" || tecla == "3" || tecla == "4" || tecla == "5" || tecla == "6" || tecla == "7" || tecla == "8" || tecla == "9"){
            this.digitos(tecla);
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

        else if(tecla == "."){
            this.punto();
        }

        else if (tecla =="%"){
            this.porcentaje();
        }

        else if(tecla == "r"){
            this.raiz();
        }

        else if(tecla == "="){
            this.igual();
        }

        else if(tecla == "Escape"){
            this.on();
        }
        else if(tecla == "Enter"){
            this.igual();
        }
    }

    digitos(numero){
        if(this.action=="igual"){
            this.pantalla = numero;
            this.cadena="";
            this.mostrarCadena();
            this.mostrarPantalla();


        }
        else{
            if(this.action=="digito" || this.action=="punto"){
                this.pantalla += numero;
                this.mostrarPantalla();
            }
            else{
                this.pantalla = numero;
                this.mostrarPantalla();
            }
        }
        this.action = "digito";
    }

    punto(){
        if(this.action=="digito"){
            this.pantalla += '.';
        }
        else{
            this.pantalla = '.';
        }
        this.action="punto"
        this.mostrarPantalla();
    }

    igual(){
        try{
            if(this.pantalla!=""){
                if(this.pantalla != this.cadena){
                    if(this.feAct == true){
                        this.cambiarAexponencial();
                    }
                    if(this.action != "close"){
                        this.cadena+=this.pantalla;
                    }
                    var resultado = eval(this.cadena);
                    if(this.feAct == false){
                        this.pantalla = Number(resultado);
                    }else{
                        this.pantalla = Number.parseFloat(resultado).toExponential();
                    }
                    this.mostrarPantalla();
                    this.mostrarCadena();
                }
            }
            this.action ="igual";
        } catch (error){
            console.log("Error "+error)
        }
    }

    pi(){
        this.pantalla = Math.PI;
        this.mostrarPantalla();
        this.action = "pi"
    }

    log(){
        this.operacionEspecial("Logaritmo");
    }

    raiz(){
        this.operacionEspecial("Raiz");
    }
    
    factorial(){
        this.operacionEspecial("Factorial");
    }

    potenciaCuadrado(){
        this.operacionEspecial("PotenciaCuadrado");
    }

    potencia10(){
        this.operacionEspecial("Potencia10");
    }

    potenciaxy(){
        this.operacionesBasicas("**");
        this.action = "Potenciaxy";
    }

    mod(){
        this.operacionesBasicas("%");
        this.action = "Modulo";
    }

    exp(){
        this.operacionesBasicas("e+");
        this.action = "Exp"
    }

    seno(){
        if(this.flechaAct == false){
            this.#operacionTrigonometrica("Seno");
        }
        else{
            this.#operacionTrigonometrica("Secante");
        }
    }

    coseno(){
        if(this.flechaAct == false){
            this.#operacionTrigonometrica("Coseno");
        }
        else{
            this.#operacionTrigonometrica("Cosecante")
        }
    }

    tangente(){
        if(this.flechaAct == false){
            this.#operacionTrigonometrica("Tangente");
        }
        else{
            this.#operacionTrigonometrica("Cotangente");
        }
    }

    borrar(){
        if(this.pantalla.length == 1 && this.pantalla !="0"){
            this.pantalla = "0";
        }
        else{
            if(this.pantalla>1){
                this.pantalla = this.pantalla.substring(0,this.pantalla.length-1);
            }
        }
        this.mostrarPantalla();
        this.action = "borrar";
    }

    open(){
        this.cadena += "(";
        this.mostrarCadena();
    }

    close(){
        this.cadena += this.pantalla+""+")";
        this.mostrarCadena();
        this.action = "close";
    }

    operacionesBasicas(operador){
        if(this.action == "igual"){
            this.cadena="";
        }
        if(this.feAct == true){
            this.cambiarAexponencial();
        }
        if(this.action == "close"){
            this.cadena+=operador;
        }
        else{
            this.cadena+=this.pantalla+""+operador;
        }
        this.mostrarCadena();
    }

    cambiarAexponencial(){
        this.pantalla = Number.parseFloat(this.pantalla).toExponential();
    }

    operacionEspecial(operador){
        var resultado = this.buscarFuncion(operador);
        this.pantalla = resultado;
        this.action = "igual";
        if(this.feAct == true){
            this.cambiarAexponencial();
        }
        this.mostrarPantalla();
    }

    #operacionTrigonometrica(operador){
        var parametro = this.cambiarUnidades();
        var resultado = this.#buscarFuncionTrigonometrica(operador,parametro);
        if(Number(resultado)<Number("1e-10")){
            resultado = "0";
        }
        this.pantalla = resultado;
        this.actio = "igual";
        if(this.feAct == true){
            this.cambiarAexponencial();
        }
        this.mostrarPantalla();
    }

    #buscarFuncionTrigonometrica(operador,parametro){
        switch(operador){
            case"Seno":
                return Math.fround(Math.sin(parametro));
            case "Coseno":
                return Math.fround(Math.cos(parametro));
            case "Tangente":
                return Math.tan(parametro);
            case "Secante":
                return Math.asin(parametro);
            case "Cosecante":
                return Math.acos(parametro);
            case "Cotangente":
                return Math.atan(parametro);
        }
    }


    buscarFuncion(operador){
        switch(operador){
            case "Logaritmo":
                return Math.log10(Number(this.pantalla));
            case "Raiz":
                return Math.sqrt(Number(this.pantalla));
            case "Potencia10":
                return Math.pow(10,Number(this.pantalla));
            case "PotenciaCuadrado":
                return Math.pow(Number(this.pantalla),2);
            case "Factorial":
                return this.calcularFactorial(Number(this.pantalla));              
        }
    }



    calcularFactorial(numero){
        var resultado = 1;
        for(var i=1;i<=numero;i++){
            resultado = resultado * i;
        }
        return resultado;
    }

    mostrarPantalla(){
        if(this.feAct == true || this.action =="punto"){          
            document.getElementById("pantalla").value = this.pantalla;
        }
        else{
            document.getElementById("pantalla").value = Number(this.pantalla);
        }
    }

    mostrarCadena(){
        document.getElementById("cadena").value = this.cadena;
    }

    on(){
        this.cadena="";
        this.pantalla="";
        this.action= "";
        this.mostrarPantalla();
        this.mostrarCadena();
    }

    ce(){
        if(this.pantalla != "0"){
            this.pantalla = "0";
            this.mostrarPantalla();
        } 
    }

    cambioSigno(){
        if(Number(this.pantalla)>0){
            this.pantalla = "-"+this.pantalla;
        }
        else{
            this.pantalla = this.pantalla.substring(1,this.pantalla.length);
        }
        this.mostrarPantalla();
    }

    mr(){
        if(this.memory!=""){
            this.pantalla = this.memory;
            this.mostrarPantalla();
        }
    }

    mc(){
        this.memory = "";
        this.action ="MC";
    }

    mMas(){
        this.memory += this.pantalla;
        this.action = "M+";
    }

    mMenos(){
        this.memory -= this.pantalla;
        this.action = "M-";
    }

    flecha(){
        if(this.flechaAct==false){
            this.flechaAct = true;
            document.querySelector("input[name='sin']").setAttribute('value','sec');
            document.querySelector("input[name='cos']").setAttribute('value','csc');
            document.querySelector("input[name='tan']").setAttribute('value','cot');
        }
        else{
            this.flechaAct = false;
            document.querySelector("input[name='sin']").setAttribute('value','sin');
            document.querySelector("input[name='cos']").setAttribute('value','cos');
            document.querySelector("input[name='tan']").setAttribute('value','tan');
        }
    }

    unidadesBoton(){
        this.i++;
        if(this.i>=this.unidades.length){
            this.i = 0;
        }
        var unidad = this.unidades[this.i];
        document.querySelector("input[name='unidades']").setAttribute('value',unidad);
    }

    cambiarUnidades(){
        switch (this.unidades[this.i]){
            case "DEG": 
                return (Number(this.pantalla) * Math.PI) / 180;
            case "RAD":
                return Number(this.pantalla);
            case "GRAD":
                return (Number(this.pantalla) * Math.PI) / 200;
        }
    }

    fe(){
        if(this.feAct == false){
            this.feAct = true;
             if(this.pantalla!=""){
                this.pantalla = Number.parseFloat(this.pantalla).toExponential();
                this.mostrarPantalla();
             }
        }
        else{
            this.feAct = false;
            this.pantalla = eval(this.pantalla);
            this.cadena ="";
            this.mostrarPantalla();
            this.mostrarCadena();
        }
    }
}
