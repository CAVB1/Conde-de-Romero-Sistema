<?php
session_start();
if(isset($_SESSION['username'])){
    $user=$_SESSION['username'];
    $nivel=$_SESSION['nivel'];
    header("Content-Type: application/json");
    echo json_encode(array("nivel"=>$user,"user"=>$nivel));
}else{
    header("Content-Type: application/json",null, 500);
}
?>