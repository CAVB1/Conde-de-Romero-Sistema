<?php

require_once '../docentes.php';
if (isset($_GET['nocontrol'])){
    header("Content-Type: application/json");
    echo json_encode(Docentes::getMateriasDocente($_GET["nocontrol"])) ;
}else{
    header("Content-Type: application/json", null, 400);
}
?>