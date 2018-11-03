<?php

interface DbSentencias {
    

//ANIMAL
const INSERTAR_ANIMAL = "INSERT INTO `usobackend`.`animal`(`nombre`,`especie`, `raza`,`edad`)VALUES (?,?,?,?);";
const LISTAR_ANIMAL = "SELECT `animal`.* FROM `usobackend`.`animal`;";
const BUSCAR_ULTIMOANIMAL = "SELECT `animal`.* FROM `usobackend`.`animal` WHERE `animal`.`idAnimal` = (SELECT MAX(idAnimal) FROM `animal`);";
const ACTUALIZAR_ANIMAL = "UPDATE `animal` SET `nombre`= ?,`especie`= ?, `raza`= ?,`edad`= ? WHERE idAnimal = ?";
const ELIMINAR_ANIMAL = "DELETE FROM `animal` WHERE idAnimal = ?;";
const  BUSCAR_ANIMALES = "SELECT * FROM `animal` WHERE ? = ?;";

}
