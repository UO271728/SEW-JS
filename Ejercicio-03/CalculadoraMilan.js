"use stric";
class Calculadora{

    constructor (){
        this.memory="";
        this.operando1="0";
        this.operando2="";
        this.operator="";
        this.action="";
        
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
        else if(tecla == "o"){
            this.on();
        }
        else if(tecla == "c"){
            this.ce();
        }
        else if(tecla == "s"){
            this.cambioSigno();
        }
        else if(tecla == "p"){
            this.porcentaje();
        }
        else if(tecla == "m"){
            this.mMas();
        }
        else if(tecla == "n"){
            this.mMenos();
        }
        else if(tecla == "a"){
            this.mrc();
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
        document.querySelector("input[name='pantalla']").setAttribute('value',cadena);
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
