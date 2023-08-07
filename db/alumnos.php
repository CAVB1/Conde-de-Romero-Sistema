<?php
class Alumnos{
    public static function InsertAlumno($matricula, $passwd, $nombre, $apellido_p,$apellido_m,$nivel,$grado, $id_grupo){
        include_once 'db_connection.php';
        $sql="INSERT INTO docentes(matricula, passwd, nombre, apellido_p, apellido_m,nivel_escolar, grado_escolar,fk_id_grupo)
        VALUES($matricula, '$passwd','$nombre', '$apellido_p','$apellido_m', '$nivel','$grado',$id_grupo)";
        return $conexion->query($sql);
    }

    public static function getAllAlumnos(){
        consultaSQL("SELECT * FROM alumnos");
    }

    public static function getAlumnosByGrupo($id_grupo){
        consultaSQL("SELECT * FROM alumnos WHERE fk_id_grupo=$id_grupo");
    }

    public static function getAlumno($matricula){
        consultaSQL("SELECT * FROM alumnos WHERE matricula=$matricula");
    }
    public static function deleteAlumno($matricula){
        consultaSQL("SELECT * FROM alumnos WHERE matricula=$matricula");
    }

    public static function upadateAlumno($matricula, $passwd, $nombre, $apellido_p,$apellido_m,$nivel,$grado, $id_grupo){
        include_once 'db_connection.php';
        $sql="UPDATE alumnos SET passwd='$passwd', nombre='$nombre', apellido_p='$apellido_p', apellido_m='$apellido_m', nivel_escolar='$nivel', 
        grado_escolar='$grado', fk_id_grupo='$id_grupo' WHERE matricula=$matricula";
        return $conexion->query($sql);
    }
}

?>