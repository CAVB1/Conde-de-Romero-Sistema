<?php
include_once '../alumnos.php';
if (isset($_POST['matricula'])&&isset($_POST['passwd'])&&isset($_POST['nombre'])&&isset($_POST['apellidop'])&&isset($_POST['apellidom'])&&isset($_POST['idgrupo'])){
    $matricula=$_POST['matricula'];
    $pass=$_POST['passwd'];
    $nombre=$_POST['nombre'];
    $apellidop=$_POST['apellidop'];
    $apellidom=$_POST['apellidom'];
    $idgrupo=$_POST['idgrupo'];
   
    $res=Alumnos::InsertAlumno($matricula,$pass,$nombre,$apellidop,$apellidom,$idgrupo);

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