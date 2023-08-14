<?php
require '../quey.php';
$grupos=consultaSQL("SELECT grupos.*,concat(docentes.nombre,' ', docentes.apellido_p,' ',docentes.apellido_m)as nombre_tutor from grupos join docentes on grupos.tutor=docentes.id_docente");
$materias=[];
for($i=0; $i<count($grupos);$i++){
    $g=$grupos[$i];
    $materias[]=consultaSQL("SELECT materias.* from materias join grupos on grupos.id_grupo=materias.fk_id_grupo where grupos.id_grupo=".$g['id_grupo']);
    
}

header("Content-Type: application/json");
echo json_encode([$grupos,$materias]);
?>