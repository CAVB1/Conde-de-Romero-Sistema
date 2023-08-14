<?php
require '../calificaciones.php';
if( isset($_POST['id_calificacion'])&&isset($_POST["calificacion"])){
    
    $res=Calificaciones::updateCalificacion($_POST['id_calificacion'],$_POST['calificacion']);
    if($res){
        header("Content-Type: application/json", null, 200);
        echo json_encode(array('message' => 'Registro exitoso'));
    }else{
        header("Content-Type: application/json", null, 500);
        echo json_encode(array('message' => 'Falló el registro'));

    }

}elseif(isset($_POST['id_alumno'])&&isset($_POST['id_docente'])&&isset($_POST['id_materia'])&&isset($_POST['calificacion'])&&isset($_POST['bloque'])){
    $res=Calificaciones::InsertCalificacion($_POST['id_alumno'],$_POST['id_docente'],$_POST['id_materia'],$_POST['calificacion'],$_POST['bloque']);
    if($res){
        header("Content-Type: application/json", null, 200);
        echo json_encode(array('message' => 'Registro exitoso'));
    }else{
        header("Content-Type: application/json", null, 500);
        echo json_encode(array('message' => 'Falló el registro'));

    }
}else{
    header("Content-Type: application/json",null,400);

}
?>