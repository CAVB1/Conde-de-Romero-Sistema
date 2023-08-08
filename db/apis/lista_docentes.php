<?php
include_once '../docentes.php';

header("Content-Type: application/json");
echo json_encode( Docentes::getAllDocentes());
?>