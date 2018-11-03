<?php

require 'ControladorGeneral.php';

class ControladorAnimal extends ControladorGeneral {
   
    function __construct() {
        parent::__construct();
    }
    
    public function agregar($datos) {
        try {
           $this->refControladorPersistencia->iniciarTransaccion();
           $parametros = array("nombre" => $datos['nombre'], "especie" => $datos['especie'], "raza" => $datos['raza'], "edad" => $datos['edad']);
           $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::INSERTAR_ANIMAL, $parametros);
           $this->refControladorPersistencia->confirmarTransaccion();
        } catch (Exception $e){
           echo 'Error: '. $e->getMessage();
       };
    }

    public function eliminar($datos) {
       try {
            $this->refControladorPersistencia->iniciarTransaccion();
            $parametros = array("idAnimal" => $datos['id']);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::ELIMINAR_ANIMAL, $parametros);
            $this->refControladorPersistencia->confirmarTransaccion();
        } catch (Exception $e) {
            echo 'Error: '. $e->getMessage();
        }
    }

    public function listar($datos) {
        try {
            $this->refControladorPersistencia->iniciarTransaccion();
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::LISTAR_ANIMAL);
            $arrayAnimal = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $arrayAnimal;
        } catch (Exception $e) {
            echo 'Error: '. $e->getMessage();
        }
    }

    public function modificar($datos) {
         try {
           $this->refControladorPersistencia->iniciarTransaccion();
           $parametros = array("nombre" => $datos['nombre'], "especie" => $datos['especie'], "raza" => $datos['raza'], "edad" => $datos['edad'], "idAnimal" => $datos['id']);
           $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::ACTUALIZAR_ANIMAL, $parametros);
           $this->refControladorPersistencia->confirmarTransaccion();
        } catch (Exception $e){
           echo 'Error: '. $e->getMessage();
       };
    }
}

