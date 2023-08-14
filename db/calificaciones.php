<?php
include_once 'quey.php';

class Calificaciones{
    public static function InsertRubro($nombre_rubro,$id_materia,$id_alumno,$valor, $bloque){
        require 'db_connection.php';

        $stmsql="INSERT INTO rubros(nombre_rubro, fk_id_materia,fk_id_alumno,valor,bloque) VALUES('$nombre_rubro',$id_materia,$id_alumno, $valor,'$bloque')";
        return $conexion->query($stmsql);
    }

    public static function getNoRubros($id_materia){
        return consultaSQL("SELECT COUNT(rubros.id_rubro) as no_rubros FROM rubros WHERE rubros.fk_id_materia=$id_materia")[0]['no_rubros'];
    }

    public static function InsertCalificacion($id_alumno,$id_docente,$id_materia,$calificacion, $bloque){
        require 'db_connection.php';
        $stmsql="INSERT INTO calificaciones(fk_id_alumno, fk_id_docente, fk_id_materia,calificacion, bloque) VALUES($id_alumno,$id_docente,$id_materia,$calificacion,'$bloque')";
        return $conexion->query($stmsql);

    }

    public static function updateCalificacion($id_calificacion,$calificacion){
        require 'db_connection.php';
        $stmsql="UPDATE calificaciones SET calificacion=$calificacion WHERE id_calificacion=$id_calificacion;";
        return $conexion->query($stmsql);
    }

    public static function updateRubro($id_rubro, $calificacion){
        require 'db_connection.php';
        $stmsql="UPDATE rubros SET cal_final=$calificacion WHERE id_rubro=$id_rubro;";
        return $conexion->query($stmsql);
    }
}
?>