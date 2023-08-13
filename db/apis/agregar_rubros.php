<?php
require_once '../calificaciones.php';
require_once '../materias.php';
if (isset($_POST['nombre_rubro']) && isset($_POST['id_materia']) && isset($_POST['valor']) ) {
    $nombre = $_POST['nombre_rubro'];
    $id_m = $_POST['id_materia'];
    $valor = $_POST['valor'];

    $alumnos=Materias::getListaAlumnos($id_m);
    
    
    for($i=1;$i<4;$i++){
$bloque = $i;
foreach($alumnos as $alumno){
    $id_al=$alumno['id_alumnos'];
     $res = Calificaciones::InsertRubro($nombre, $id_m, $id_al, $valor, $bloque);
    if ($res) {
        header("Content-Type: application/json");
        echo json_encode(array("message" => "Registro exitoso"));
    } else {
        header("Content-Type: application/json", null, 500);
        echo json_encode(array("message" => "El registro falló"));
    }
}
    }

   
} else {
    header("Content-Type: application/json", null, 400);
    echo json_encode(array("message" => "Petición incorrecta"));
}
?>