$(function(){
   var funcionesAnimales = {};
   
   (function(app){
       app.init = function () {
           
           funcionesGenerales(app);
           app.cargarDataTable("Animal");  
           app.bindings("Animal");
       
       }
       
     app.init();
     
   })(funcionesAnimales);
});

