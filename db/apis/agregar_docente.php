<?php
require '../Docente.php';
if (isset($_POST['nocontrol']) && isset($_POST['nombre']) && isset($_POST['apellidop']) && isset($_POST['apellidom']) && isset($_POST['passwd']) && isset($_POST['foto'])) {
    $nocontrol = $_POST['nocontrol'];
    $nombre = $_POST['nombre'];
    $apellidop = $_POST['apellidop'];
    $apellidom = $_POST['apellidom'];
    $passwd = $_POST['passwd'];
    $foto = $_POST['foto'];


    if (Docentes::InsertDocente($nocontrol, $nombre, $apellidop, $apellidom, $passwd, $foto)) {
        header("Content-Type: application/json", null, 200);
        echo json_encode(array('message' => 'Registro exitoso'));
    } else {
        header("Content-Type: application/json", null, 500);
        echo json_encode(array('message' => 'Datos erroneos'));
    }

} else {
    header("Content-Type: application/json", null, 500);
    echo json_encode(array('message' => 'Datos erroneos'));
}
?>