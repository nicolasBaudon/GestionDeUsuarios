<?php

require_once '../Persistencia/ControladorPersistencia.php';
require_once '../Persistencia/DbSentencias.php';

abstract class ControladorGeneral {
    protected $refControladorPersistencia;
    public function __construct() {
        $this->refControladorPersistencia = ControladorPersistencia::obtenerCP();
    }
    
    public abstract function listar($datos);
    public abstract function eliminar($datos);
    public abstract function modificar($datos);
    public abstract function agregar($datos);
    
    
}