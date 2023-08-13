<?php
require_once '../calificaciones.php';
if (isset($_GET['id_materia'])) {
    $num = Calificaciones::getNoRubros($_GET['id_materia']);
    header("Content-Type: application/json");
    echo json_encode(array("num" => $num));
} else {
    header("Content-Type: application/json", null, 400);
    echo json_encode(array("message" => "Petición incorrecta"));
}
?>