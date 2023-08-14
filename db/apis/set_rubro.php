<?php
require "../calificaciones.php";
if (isset($_POST['id_rubro'])&&isset($_POST['calificacion'])){
    $res=Calificaciones::updateRubro($_POST['id_rubro'],$_POST['calificacion']);
    if($res){
        header("Content-Type: application/json", null, 200);
        echo json_encode(array('message' => 'Registro exitoso'));
    }else{
        header("Content-Type: application/json", null, 500);
        echo json_encode(array('message' => 'Falló el registro'));

    }
}else{
    header("Content-Type: application/json", null, 400);
        echo json_encode(array('message' => 'Falló el registro'));

}
?>