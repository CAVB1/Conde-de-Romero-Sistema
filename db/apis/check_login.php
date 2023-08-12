<?php
session_start();
if(isset($_SESSION['username'])){
    $user=$_SESSION['username'];
    $nivel=$_SESSION['nivel'];
    header("Content-Type: application/json");
    echo json_encode(array("nivel"=>$nivel,"user"=>$user));
}else{
    header("Content-Type: application/json",null, 500);
}
?>