let cont =0; //contador para mostrar o esconder iconos delete
$(document).ready(function(){
   var second = false;

    $("#startScanning").on('click', function() { // un solo botón se encarga de mostrar y esconder Menú
        if(second){
         
            window.location.href = "historial.html";
        }
        second=true
        $("#startScanning").html('Stop');
        
        $("#temporal").hide();
        
    });

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
});
