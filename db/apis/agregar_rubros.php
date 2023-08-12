<?php
require_once '../calificaciones.php';
if (isset($_POST['nombre_rubro']) && isset($_POST['id_materia']) && isset($_POST['valor']) && isset($_POST['bloque'])) {
    $nombre = $_POST['nombre_rubro'];
    $id_m = $_POST['id_materia'];
    $valor = $_POST['valor'];
    $bloque = $_POST['bloque'];

    $res = Calificaciones::InsertRubro($nombre, $id_m, $valor, $bloque);
    if ($res) {
        header("Content-Type: application/json");
        echo json_encode(array("message" => "Registro exitoso"));
    } else {
        header("Content-Type: application/json", null, 500);
        echo json_encode(array("message" => "El registro falló"));
    }
} else {
    header("Content-Type: application/json", null, 400);
    echo json_encode(array("message" => "Petición incorrecta"));
}
?>