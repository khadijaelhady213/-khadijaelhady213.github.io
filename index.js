$(document).ready(function(){
   
    $("#myprojectBar").on({
        mouseenter: function () {
            //stuff to do on mouse enter
            
            $(this).css("background-color", "#green");
            $(this).css("opacity", "1");

            $(this).css("cursor", "pointer");
            // $('#barimg1').hide();

           
        },
        mouseleave: function () {
            //$(this).css("background-color", "#008AFC4D");
            // $('#barimg1').show();
        }
    });

});
