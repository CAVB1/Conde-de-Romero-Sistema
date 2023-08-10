<?php
require '../grupos.php';
if(isset($_POST['nombre'])&&isset($_POST['nivel'])&&isset($_POST['grado'])&&isset($_POST['tutor'])){
    $res=Grupos::InsertGrupo($_POST['nombre'], $_POST['nivel'],$_POST['grado'],$_POST['tutor']);
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