
//CONTENIDO: SOLO REGISTRARSE Y LOGIN
let cont =0; //contador para mostrar o esconder iconos delete
var userCestedSucsesfully= false;

$(document).ready(function(){
    
    var localstorageDATA= getAccounts(); //COMPROBAR SI EL LOCAL STORAGE ESTÀ VACÍO
    
    $("#btMenu").on('click', function() { // un solo botón se encarga de mostrar y esconder Menú
        if(cont == 1){
            $("#menuSecrtion").slideUp()
            cont= 0;

        }else{
            $("#menuSecrtion").slideDown()
            cont=1;
        }
    });

    
    //Cuando se pulse el botón join us para registrarse:
    $("#btJoinUsRegister").on('click', function() {
        var emptyCamps = true; //inicial valor de emptyCamps
        var emailExist = false;
        var emptyData=true;
       
        //comprobar si los inputs están vacíos

        if (jQuery('#newEmail').val() == ''){ 
           
            $("#newEmail").css({"border":  "1px solid #EC6261"});
	        emptyCamps=false;

        }else{
            $("#newEmail").css({"border":  "1px solid #ced4da"});
        }
        
        if(jQuery('#newEmail').val() != ''){ //si en input de correo  no está vaciío se comproba si ya existe en el localstorage
            
            var email = $("#newEmail").val();
            emailExist = emailAlreadyExists(email);
        }
        
        if (jQuery('#newPassword').val() == ''){ 

            $("#newPassword").css({"border":  "1px solid #EC6261"});
            emptyCamps=false;

        }else{
            $("#newPassword").css({"border":  "1px solid #ced4da"});
        }
        
        if (jQuery('#newName').val() == ''){ 

            $("#newName").css({"border":  "1px solid #EC6261"});
            emptyCamps=false;
        }else{
            $("#newName").css({"border":  "1px solid #ced4da"});
        }
        
        if (jQuery('#newLastName').val() == ''){ 

            $("#newLastName").css({"border":  "1px solid #EC6261"});
            emptyCamps=false;
        }else{
            $("#newLastName").css({"border":  "1px solid #ced4da"});
        }
        
        if (jQuery('#dataDay').val() == ''){

            $("#dataDay").css({"border":  "1px solid #EC6261"});
             emptyCamps=false;
             emptyData=false;

        }if (jQuery('#dataMonth').val() == ''){ 

            $("#dataMonth").css({"border":  "1px solid #EC6261"});
            emptyCamps=false;
            emptyData=false;

        }if (jQuery('#dataYear').val() == ''){  
            
            $("#dataYear").css({"border":  "1px solid #EC6261"});
            emptyCamps=false;
            emptyData=false;

        }
        
        //comprobar si hay campos vaciíos
        if( emptyCamps== false){
            alert("Hay campos sin rellenar");
            //comprobar si el correo y existe
        }if( emailExist== true){
            $("#newEmail").css({"border":  "1px solid #EC6261"});
            alert("El correo introducido ya existe, intente con otro correo");
        
        }else {
           
            //obtener el contenido de inputs
            var email = $("#newEmail").val();
            var password = $("#newPassword").val();
            var name = $("#newName").val();
            var lastName = $("#newLastName").val();
            var day = $("#dataDay").val();
            var month = $("#dataMonth").val();
            var year = $("#dataYear").val();
            
            var validBirthday = false;
            validBirthday =  validateBirthday(day,month,year);

            if(validBirthday){

                var birthdate = day + "/" + month+"/"+ year; //formater data nacimiento
                registerUser(email, password,name,lastName, birthdate);
            }if( emptyData==true && validBirthday== false){
               
                $("#dataDay").css({"border":  "1px solid #EC6261"});
                $("#dataMonth").css({"border":  "1px solid #EC6261"});
                $("#dataYear").css({"border":  "1px solid #EC6261"});
                alert("La data introducid no ves valida");
            }
            
        }
           
    }); 
    
    $("#btlogin").on('click', function() {
        
        //comprobar si los inputs están vacíos
        var emptyCamps=true; //inicial valor de emptyCamps
        if (jQuery('#email').val() == ''){ 
            $("#email").css({"border":  "1px solid #EC6261"});
            emptyCamps=false;
        }
        if (jQuery('#password').val() == ''){ 
            $("#password").css({"border":  "1px solid #EC6261"});
            emptyCamps=false;
        }
        
        if( emptyCamps== false){
            alert("Hay campos sin rellenar");
        
        }
        
        if( emptyCamps== true){
           
            //obtener el contenido de inputs
            var email = $("#email").val();
            var password = $("#password").val();
          
            checkLogin(email, password);
        }

    });



});

var accounstList=[];

function registerUser(email1, password1,name1,lastName1, birthdate1){
    newid = cretetUserID(); //invocar función generadora de ids

    //crear un objeto articulo y guardarlo en el array artList[]
    var user = {email :email1,
                    password : password1,
                    name: name1,
                    lastName: lastName1,
                    birthdate: birthdate1,
                    id:newid,
                     }
     
    accounstList.push(user);
    //subir la lista al localstorage
    localStorageAccount(accounstList);
  
       
}

//función para generar ids únicos
function cretetUserID(){
    //location.reload();
    let latID =localStorage.getItem("latID") || "-1" ; //si en el localstrorage == null este lo inicializa con valor -1 sino coge el valor que tenga;
    let newID = JSON.parse(latID) + 1;  //al valor obtenido de localstorage se le suma 1
    localStorage.setItem("latID", JSON.stringify(newID)); //guardar el nuevo valor de id en el localstorage

    return newID; //devuelve un id único;
}

//funcion para guardar la lista en localStorage
function localStorageAccount(accountsList){
    localStorage.setItem('localAccounstList', JSON.stringify(accountsList));
    userCestedSucsesfully=true;
    alert("Se ha create el usuario con éxito!") ;
    window.location.href = "scanner.html";
}

//obtener la lista del localstorage
function getAccounts(){
   
    var storedList = localStorage.getItem('localAccounstList');
    if(storedList == null){ //comprobar que haya algo guardado dentro del local storage
        accounstList =[];
        
    }else{
        
        accounstList= JSON.parse(storedList);
    }
    
    return accounstList;
}
//imprimir el contenirdo de las lisas que hay en el localstoarage
function checkLogin(login_email, login_password){
  
    var list = getAccounts();
    var  login_ok=false;
  
    //recorrer los datos registrados en la lista del local storage
    for (var i = 0; i<list.length; i++){
        for (var i = 0; i<list.length; i++){
            var u_email = list[i].email;
            var u_password = list[i].password;
           
            var u_id = list[i].id;
           
            if(u_email == login_email && u_password == login_password){
                login_ok=true;
            }
           
         } 
       
    }
    
    if(login_ok == true){
        alert("Login Correcto");
        window.location.href = "scanner.html";
    } else{
        alert("Login Incorrecto");
    }
}

function emailAlreadyExists(login_email){
 
    var list = getAccounts();
    var  alreadyExist=false;
  
    //recorrer los datos registrados en la lista del local storage
    for (var i = 0; i<list.length; i++){
        for (var i = 0; i<list.length; i++){
            
            var u_email = list[i].email;

            if(u_email == login_email){
                alreadyExist=true;
                return alreadyExist;
            }
         } 
       
    }
    return alreadyExist;
}
//comaprobar si la data introducida no es un str o que no sea relista
function validateBirthday(day,month,year){
   
    var currentTime = new Date();
    var current_year = currentTime.getFullYear()
   
    if(isNaN(day) ||isNaN(month) ||isNaN(month) ){
  
        return false;

    } if(day < 0 || day > 32){
  
        return false;

    } if(month < 0 ||month>13 ){
  
        return false;

    }if(year < 1920 || year >(current_year-18)  ){
        
        return false;
    }
    return true;
}


/*function printAccounts(){
    alert("esta en print accounts");
     var list = getAccounts();
   
     //recorrer los datos registrados en la lista del local storage
     for (var i = 0; i<list.length; i++){
         for (var i = 0; i<list.length; i++){
             var u_email = list[i].email;
             var u_password = list[i].password;
            
             var u_id = list[i].id;
            alert("email: "+u_email+"  pass: " + u_password);
          } 
        
     } 
 }*/
function deleteAcount(){
   
    //cast de json a objeto
    let ArticleObject= JSON.parse(localStorage.getItem("localAccounstList")); //obtener lo que hay en el localstorage y guardarlo en una var
 
    ArticleObject = ArticleObject.filter(el => el.id != 0);
    localStorage.setItem("localAccounstList", JSON.stringify(ArticleObject));
    

    location.reload();

}

