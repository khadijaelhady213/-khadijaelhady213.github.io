let cont = 0;
$(document).ready(function(){
    //menu
    $("#btMenu").on('click', function() { // un solo botón se encarga de mostrar y esconder Menú
        if(cont == 1){
            $("#menuSecrtion").slideUp()
            cont= 0;

        }else{
            $("#menuSecrtion").slideDown()
            cont=1;
        }
    });


    printProducts();
    
    if($('.btdelete').length){
        
    }else{
        finalOutputString="<div id=empty> <p> Empthy !</p> <img src='./img/grocery.jpg' width=350px> </div>";
        $(".products").prepend(finalOutputString); //insertar artículo a la pasrte principal
    }
    $("#menuSecrtion").hide();

    $(".btdelete").on('click', function() {
        console.log("botón delete");
       //dos métodes para acceder al div indicado y borar la secciín entera
        var barcode = $(this).parent().parent().parent().parent().attr('id'); //obtener el objeto que tinen el id de la papelera
   
       deleteArticulo(barcode); //funció que elimina el objeto al que corresponde al idintrosucido 
        
    });
   
 });
 
 //obtener la lista del localstorage
 function getProducts(){
 
     var storedList = localStorage.getItem('localProductsList');
     if(storedList == null){ //comprobar que haya algo guardado dentro del local storage
         productsList =[];
         
     }else{
         
         productsList= JSON.parse(storedList);
     }
     
     return productsList;
 }
 
 function printProducts(){
     var list = getProducts();
    
     //recorrer los datos registrados en la lista del local storage
     for (var i = 0; i<list.length; i++){
        var p_name = list[i].name;
        var p_date = list[i].date;
        var p_price = list[i].price;
        var p_barcode = list[i].barcode;
       
        var bt = "<button class='btdelete' type='button'>Eliminar</button>";
        var finalOutputString ="<product id='"+p_barcode+"'><div class='row'> <div id='foto'><img src='./img/"+p_barcode+".png' width=10px ></div> <div id='info'><h2 id='name'>"+p_name+"</h2> <p id='price'>"+p_price+"€</p> <div id=data_delete><p id='data'>"+p_date+"</p> "+bt+" </div></div> </div></product>";
         
         $(".products").prepend(finalOutputString); //insertar artículo a la pasrte principal
     }
 }
 
 //borrrar artículo
function deleteArticulo(Find_barcode){
   
    //cast de json a objeto
    let ArticleObject= JSON.parse(localStorage.getItem("localProductsList")); //obtener lo que hay en el localstorage y guardarlo en una var
    
    ArticleObject = ArticleObject.filter(el => el.barcode != Find_barcode);
    localStorage.setItem("localProductsList", JSON.stringify(ArticleObject));
    
    location.reload();

}
 