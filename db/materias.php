<?php
include_once 'quey.php';

class Materias{
    public static function InsertMateria($nombre, $docente,$grupo){
        require 'db_connection.php';
        $stmsql="INSERT INTO materias(nombre_materia,fk_id_docente,fk_id_grupo) VALUES('$nombre',$docente,$grupo)";
        return $conexion->query($stmsql);
    }
}

?>