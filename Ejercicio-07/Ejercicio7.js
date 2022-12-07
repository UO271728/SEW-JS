"use stric"
class Modificadora{
    
    constructor(){
        this.borrado = false;
        this.añadido = false;
        this.sumado = false;
        this.modificado = false;
        this.arbol = false;
    }

    /* Tarea 1*/
    hideTutorial(){
        $("h2:first").hide();
        $("p:first").hide();
    }
    /* Tarea 1*/
    showTutorial(){
        $("h2:first").show();
        $("p:first").show();
    }

    /* Tarea 2*/
    modificar(){
        if(this.arbol == false){
            $("h2:last").text("Sueldos")
        }
        else{
            $("h2").eq(2).text("Sueldos");
        }
    }

    /* Tarea 3*/
    addCampeones(){
        if(this.añadido ==  false){
            var titulo = "<h3> Ultimos campeones </h3>"
            var campeones = "<ul>\ <li>Golden State Warriors,2022\n <li>Milwaukee Bucks,2021\n <li>Los Angeles Lakers,2020\n<li>Toronto Raptors,2019\n<li>Golden State Warriors,2018\n</ul>"
            $("section:last").after(titulo);
            $("h3:last").after(campeones);
            this.borrado = false;
            this.añadido = true;
        }
        

    }

    /* Tarea 4*/
    deleteCampeones(){
        if(this.borrado == false){
            $("h3:last").remove();
            $("ul").remove();
            this.añadido = false;
            this.borrado = true;
        }
    }

    /* Tarea 5*/
    recorrerArbol(){
        if(this.arbol == false){
            let str = "<h2> Recorrido de DOM </h2>\n";
            $("*",document.body).each(function() {
                var etiquetaPadre = $(this).parent().get(0).tagName;
                var etiquetaPropia = $(this).get(0).tagName;
                str+= "<p>Tipo del elemento padre:"+etiquetaPadre + " - Tipo del propio elemento "+ etiquetaPropia+"</p>"
            });
            this.arbol = true;
            $("body").last().append(str);
        }
    }

    /* Tarea 6*/
    sumarFilasColumnas(){
        if(this.sumado == false){
            var columnas = [];
            var total = 0;
            $("table tr").each(function() {
                var fila = 0;
                var elementos = $(this).find('td');
                $(this).find('th').last().after("<th> Suma </th>");
                for(var i = 0;i<elementos.length;i++){
                    if(i!=0){
                        fila += Number($(elementos[i]).text());
                        if(columnas[i]==null)
                            columnas[i]=0;
                        columnas[i]+=Number($(elementos[i]).text());
                    }
                    else{
                        columnas[i]="Suma";
                    }
                }
                $(this).find('td').last().after("<td>"+fila+"</td>");
                total+= fila;
            });
            var columnaAñadida="";
            var totalColumnas = 0;
            columnas.forEach(element => {
                columnaAñadida+="<td>"+element+"</td>";
                if(element != "Suma"){
                    totalColumnas+=Number(element); 
                }
            });
            total+= totalColumnas;
            columnaAñadida+="<td>"+total+"</td>";
            $("tr").last().after("<tr>"+columnaAñadida+"</tr>");
            this.sumado = true;
        }
    }
}