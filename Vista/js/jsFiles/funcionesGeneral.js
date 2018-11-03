function funcionesGenerales (app) {
    
    app.cargarDataTable = function (tipo) {
        var url = "../../Controlador/Ruteador/Ruteador.php?accion=listar&Formulario=" + tipo;
        $("#tabla" + tipo).DataTable({
            "language": {
              "url": "../js/DataTables/Spanish.json"  
            },
            "autoWidth": false,
            "ajax": {
              "url" : url,
              "dataSrc": ""
            },
            "columns": [
                {"data":"nombre"},
                {"data":"especie"},
                {"data":"raza"},
                {"data":"edad"},
                {"data":"Acciones",
                    "orderable": false,
                    "searchable": false,
                    "render": function (data, type, row, meta){
                        var a = "<a class='pull-left editar' data-id_Animal='" + row.idAnimal + "'><span class='glyphicon glyphicon-pencil'></span>Editar</a>" +                           
                                "<a class='pull-right eliminar' data-id_Animal='" + row.idAnimal + "'><span class='glyphicon glyphicon-remove'></span>Eliminar</a>";
                        return a;
                    }
                }
            ]
        });
    };
    app.bindings = function (tipo){
        $("#agregar" + tipo).on('click', function () {
            app.limpiarModal(tipo);
            $("#id").val(0);
            $("#tituloModal").html("Nuevo " + tipo);
            $("#modal" + tipo).modal({show:true});
        });
        
        $("#cuerpoTabla" + tipo).on('click', '.eliminar', function (){
            app.eliminar($(this).attr("data-id_" + tipo), tipo);
        });
    
        $("#cuerpoTabla" + tipo).on('click', '.editar', function (){
            $("#id").val($(this).attr("data-id_" + tipo));
            $("#nombre").val($(this).parent().parent().children().first().html());
            $("#especie").val($(this).parent().parent().children().first().next().html());
            $("#raza").val($(this).parent().parent().children().first().next().next().html());
            $("#edad").val($(this).parent().parent().children().first().next().next().next().html());
            $("#tituloModal").html("Editar " + tipo);
            $("#modal" + tipo).modal({show:true});
        });
        
        $("#guardar").on('click', function () {
           if ($("#id").val() == 0 ){
               app.agregarDato(tipo);
           } else {
               app.modificarTabla(tipo);
           };
        });
    };
    app.limpiarModal = function (tipo) {
        if (tipo == 'Animal') {
            $("#id").val(0);
            $("#nombre").val("");
            $("#especie").val("");
            $("#raza").val("");
            $("#edad").val("");
        }
    };
    app.agregarDato = function (tipo) {
        var url = "../../Controlador/Ruteador/Ruteador.php?accion=agregar&Formulario=" + tipo;
        var datosEnviar = $("#form" + tipo).serialize();
        $.ajax({
           url: url,
           method: 'POST',
           dataType: 'json',
           data: datosEnviar,
           success: function (datosRecibidos){
               $("#modal" + tipo).modal('hide');
               app.limpiarModal(tipo);
               app.actualizarDataTable(tipo);
           },
           error: function (datosRecibidos) {
               alert("Error Servidor Agregar " + tipo);
           }
        });
    };
    app.actualizarDataTable = function (tipo) {
      var tabla = $("#tabla" + tipo).DataTable();
      tabla.ajax.reload();
    };
    app.modificarTabla = function (tipo) {
        var url = "../../Controlador/Ruteador/Ruteador.php?accion=modificar&Formulario=" + tipo;
        var datosEnviar = $("#form" + tipo).serialize();
        $.ajax({
           url: url,
           method: 'POST',
           dataType: 'json',
           data: datosEnviar,
           success: function (datosRecibidos){
               $("#modal" + tipo).modal('hide');
               app.limpiarModal(tipo);
               app.actualizarDataTable(tipo);
           },
           error: function (datosRecibidos) {
               alert("Error Servidor Editar " + tipo);
           }
        }); 
    };
    app.eliminar = function (id, tipo){
        var url = "../../Controlador/Ruteador/Ruteador.php?accion=eliminar&Formulario=" + tipo;
        var datosEnviar = {id: id};
        $.ajax({
           url: url,
           method: 'POST',
           dataType: 'json',
           data: datosEnviar,
           success: function (datosRecibidos){
               app.actualizarDataTable(tipo);
           },
           error: function (datosRecibidos) {
               alert("Error Servidor Eliminar " + tipo);
           }
        }); 
    };
};

