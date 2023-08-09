<?php
include_once '../administradores.php';
include_once '../docentes.php';
include_once '../alumnos.php';

if (isset($_POST['usuario']) && isset($_POST['contra'])) {
    $user = $_POST['usuario'];
    $pass = $_POST['contra'];

    if (Administradores::validateAdministrador($user, $pass)) {
        header('Location: ../../Administrador/docentes.html');
        exit();
    } elseif (Docentes::validateDocente($user, $pass)) {
        header('Location: ../../docentes/materias.html');
        exit();
    } elseif (Alumnos::autenticateAlumno($user, $pass)) {
        header('Location: ../../alumnos/inicio.html');
        exit();
    } 


}else{
    header("Content-Type: application/json",null, 500);
    echo json_encode( array('message'=>'No has enviado datos'));
}
?>