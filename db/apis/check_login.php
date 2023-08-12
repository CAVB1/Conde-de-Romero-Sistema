<?php
session_start();
if(isset($_SESSION['username'])){
    $user=$_SESSION['username'];
    $nivel=$_SESSION['nivel'];
    $id=$_SESSION['id'];
    header("Content-Type: application/json");
    echo json_encode(array("nivel"=>$nivel,"user"=>$user,"id"=>$id));
}else{
    header("Content-Type: application/json",null, 500);
}
?>