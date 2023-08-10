<?php
include_once 'quey.php';
class Grupos{
    public static function InsertGrupo($nombre_grupo){
        $sql="INSERT INTO grupos(nombre_grupo)
        VALUES('$nombre_grupo')";
        include_once 'db_connection.php';

        return $conexion->query($sql);

    }

    public static function getAllGrupos(){
        return consultaSQL("SELECT * FROM grupos");
    }

    public static function getAllFormatedGrupos(){
        return consultaSQL("SELECT id_grupo, concat(grado,'° ',nombre_grupo,' (',nivel,')') as nombre, grupos.tutor FROM grupos;");
    }

    public static function getGrupo($id){
        return consultaSQL("SELECT * FROM grupos WHERE id_grupo=$id");
    }

    public static function deleteGrupo($id){
        include_once 'db_connection.php';
        $sql="DELETE FROM grupos WHERE id_grupo=$id";
        return $conexion->query($sql);
    }
}
?>