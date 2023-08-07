<?php

class Docentes{
    
    public static function InsertDocente($no_control, $nombre, $apellido_p,$apellido_m,$passwd,$foto){
        include_once 'db_connection.php';
        $sql="INSERT INTO docentes(no_control, nombre, apellido_p, apellido_m, passwd, foto)
        VALUES($no_control, '$nombre', '$apellido_p','$apellido_m', '$passwd',$foto)";
        return $conexion->query($sql);


    }

    public static function getAllDocentes(){
        return consultaSQL("SELECT * FROM docentes;");
    }

    public static function getDocente($no_control){
        return consultaSQL("SELECT * FROM docentes WHERE no_control=$no_control;");
    }

    public static function getDocenteById($id){
        return consultaSQL("SELECT * FROM docentes WHERE id=$id;");

    }

    public static function updateDocente($no_control, $nombre, $apellido_p,$apellido_m,$passwd,$foto){
        include_once 'db_connection.php';
        $sql="UPDATE docentes SET nombre='$nombre', apellido_p='$apellido_p', apellido_m='$apellido_m', passwd='$passwd', foto=$foto WHERE no_control=$no_control";
        return $conexion->query($sql);
    }

    public static function deleteDocente($no_control){
        include_once 'db_connection.php';
        $sql="DELETE FROM docentes WHERE no_control=$no_control;";
        return $conexion->query($sql);
    }

    public static function getMateriasDocente($no_control){
        $sql="SELECT materias.* ";
    }
}
?>