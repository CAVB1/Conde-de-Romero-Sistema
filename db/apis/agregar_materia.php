<?php
include_once '../materias.php';
if (isset($_POST['nombre'])&&isset($_POST['docente'])&&isset($_POST['grupo'])){
    $res=Materias::InsertMateria($_POST['nombre'],$_POST['docente'],$_POST['grupo']);
    if($res==TRUE){
        header("Content-Type: application/json");
        echo json_encode(array("message"=>"Registro exitoso"));
    }else{
        header("Content-Type: application/json",null,500);
        echo json_encode(array("message"=>"El registro falló"));
    }
}else{
    header("Content-Type: application/json",null,400);
        echo json_encode(array("message"=>"Petición incorrecta"));
}
?>