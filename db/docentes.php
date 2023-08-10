<?php
include_once 'quey.php';
class Docentes{
    
    public static function InsertDocente($no_control, $nombre, $apellido_p,$apellido_m,$passwd,$foto){
        include_once 'db_connection.php';
        $sql="INSERT INTO docentes(no_control, nombre, apellido_p, apellido_m, passwd, foto)
        VALUES($no_control, '$nombre', '$apellido_p','$apellido_m', '$passwd','$foto')";
        return $conexion->query($sql);


    }

    public static function validateDocente($no_control,$passwd){
        require 'db_connection.php';
        $stmsql="SELECT * FROM docentes WHERE no_control=? AND passwd=?;";
        
        $sql=$conexion->prepare($stmsql);
        
        $sql->bind_param('ss',$no_control,$passwd);
        $sql->execute();

        $result=$sql->get_result();

        if($result->num_rows>0){
            return TRUE;
        }else{
            return FALSE;
        }
    }

    public static function getAllDocentes(){
        return consultaSQL("SELECT * FROM docentes;");
    }

    public static function getDocente($no_control){
        return consultaSQL("SELECT * FROM docentes WHERE no_control=$no_control;");
    }

    public static function getDocenteById($id){
        return consultaSQL("SELECT * FROM docentes WHERE id_docente=$id;")[0];

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
        return consultaSQL("SELECT materias.*, docentes.id_docente, CONCAT(grupos.grado,'° ',grupos.nombre_grupo,' (',grupos.nivel,')') as Grupo from materias join docentes on materias.fk_id_docente=docentes.id_docente JOIN grupos on grupos.id_grupo=materias.fk_id_grupo where docentes.id_docente=$no_control");
    }

    public static function getGrupoTutorado($id){
        $res=consultaSQL("SELECT * FROM grupos WHERE tutor=$id");
        if(count($res)>0){
            return $res[0];
        }else{
            return "";
        }
    }
}
?>