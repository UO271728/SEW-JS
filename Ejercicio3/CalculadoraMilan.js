"use stric";
class Calculadora{

    constructor (){
        this.memory="";
        this.operando1="";
        this.operando2="";
        this.operator="";
        document.addEventListener('keydown',(event) =>{
            const keyName = event.key;

            if(keyName == "0" || keyName == "1" || keyName == "2" || keyName == "3" || keyName == "4" || keyName == "5" || keyName == "6" || keyName == "7" || keyName == "8" || keyName == "9"){
                this.digitos(keyName);
            }
            else if(keyName == "+"){
                this.suma();
            }
            
            else if(keyName == "-"){
                this.resta();
            }

            else if(keyName == "*"){
                this.multiplicacion();
            }

            else if(keyName == "/"){
                this.division();
            }

            else if(keyName == "."){
                this.punto();
            }

            else if (keyName =="%"){
                this.porcentaje();
            }

            else if(keyName == "r"){
                this.raiz();
            }

            else if(keyName == "="){
                this.igual();
            }

            else if(keyName == "Escape"){
                this.on();
            }

            
        });
    }

    digitos(numero){
        if(this.operator!=""){
            if(this.operando2[0] == '0'){
                this.operando2 = numero;
            }
            else{
                this.operando2+= numero;
            }
            document.getElementById("pantalla").value = this.operando2;
        }
        else{
            if(this.operando1[0] == '0'){
                this.operando1 = numero;
            }
            else{
                this.operando1+= numero;
            }
            document.getElementById("pantalla").value = this.operando1;
        }
    }

    punto(){
        if(this.operator!=""){
            if(this.operando2.substring(this.operando2.length -1)!='.'){
                this.operando2+='.';
                document.getElementById("pantalla").value = this.operando2;
            }
        }
        else{
            if(this.operando1.substring(this.operando1.length -1)!='.'){
                this.operando1+='.';
                document.getElementById("pantalla").value = this.operando1;
            }
        }
    }

    suma(){
        if(this.operando2!=""){
            this.igual();
        }
        this.operator="+";
        this.operando2="";
    }

    resta(){
        if(this.operando2!=""){
            this.igual()
        }
        this.operator='-';
        this.operando2="";
    }

    multiplicacion(){
        if(this.operando2!=""){
            this.igual()
        }
        this.operator='*';
        this.operando2="";
    }

    division(){
        if(this.operando2!=""){
            this.igual();
        }
        this.operator='/';
        this.operando2="";
    }

    mrc(){
        this.operando1 = this.memory;
        document.getElementById("pantalla").value = this.operando1;
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
            if(this.operator =="*" && this.operando2==""){
                this.operando2 = this.operando1;
            }
            if(this.operator=="/" && this.operando2==""){
                this.operando2 = this.operando1;
                this.operando1 = '1'
            }
            if(this.operando2!=""){
                var resultado = eval(this.operando1+""+this.operator+""+this.operando2);
                document.getElementById("pantalla").value = Number(resultado);
                this.operando1 = resultado;
            }

        } catch (error){
            console.log("Error "+error)
        }
    }

    porcentaje(){
        if(this.operando1!="" && this.operando2!=""){
            var percentage = (Number(this.operando2)/100)*Number(this.operando1);
            this.operando2 = percentage;
            this.igual()
        }
    }

    raiz(){
        if(this.operando2!=""){
            var resultado = Math.sqrt(Number(this.operando2))
            this.operando2 = resultado;
            document.getElementById("pantalla").value = resultado;
        }
        else{
            var resultado = Math.sqrt(Number(this.operando1))
            this.operando1 = resultado;
            document.getElementById("pantalla").value = resultado;
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
            document.getElementById("pantalla").value = this.operando2;
        }
        else{
            if(Number(this.operando1)>0){
                this.operando1= '-'+this.operando1;
            }
            else{
                this.operando1 = this.operando1.substring(1,this.operando1.length)
            }
            document.getElementById("pantalla").value = this.operando1;
        }
    }

    on(){
        this.operando1 = "";
        this.operator = "";
        this.operando2 = "";
        document.getElementById("pantalla").value = '0';
    }

    ce(){
        if(this.operando2!=""){
            this.operando2 = "0"
            document.getElementById("pantalla").value = this.operando2;
        }
        else{
            this.operando1 = "0";
            document.getElementById("pantalla").value = this.operando1;
        }
    }



}
