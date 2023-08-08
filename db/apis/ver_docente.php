<?php
include_once '../docentes.php';
if (isset($_GET['id'])) {
    $materias=Docentes::getMateriasDocente($_GET['id']);
    $docente=Docentes::getDocenteById($_GET['id']);
    $grupot=Docentes::getGrupoTutorado($_GET['id']);
    $docente['tutorado']=$grupot['grado'].'° '.$grupot['nombre_grupo'].' ('. $grupot['nivel'].')';
    echo json_encode([$docente,$materias]);
}

?>