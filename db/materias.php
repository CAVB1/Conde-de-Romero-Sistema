<?php
include_once 'quey.php';

class Materias{
    public static function InsertMateria($nombre, $docente,$grupo){
        require 'db_connection.php';
        $stmsql="INSERT INTO materias(nombre_materia,fk_id_docente,fk_id_grupo) VALUES('$nombre',$docente,$grupo)";
        return $conexion->query($stmsql);
    }

    public static function getListaAlumnos($id_materia){
        return consultaSQL("select alumnos.* from alumnos join grupos on alumnos.fk_id_grupo=grupos.id_grupo join materias on materias.fk_id_grupo=grupos.id_grupo where materias.id_materias=$id_materia");
    }
}

?>