<?php
include "../grupos.php";

header("Content-Type: application/json");
echo json_encode(Grupos::getAllFormatedGrupos());
?>