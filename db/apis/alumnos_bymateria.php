<?php
require '../quey.php';

if (isset($_GET['id_materia'])){
    $idm=$_GET['id_materia'];
    $lista=consultaSQL("SELECT * from lista1 WHERE lista1.id_materias=$idm");
    $lista_rubros=[];
    $lista_cal=[];
    
    foreach($lista as $al){
        $rubros=consultaSQL("SELECT rubros.* from rubros JOIN lista1 on rubros.fk_id_alumno=lista1.id_alumnos  WHERE lista1.id_materias=$idm and lista1.id_alumnos=".$al['id_alumnos']." ORDER by rubros.bloque asc");
        $cals=consultaSQL("SELECT calificaciones.* from calificaciones JOIN lista1 on calificaciones.fk_id_alumno=lista1.id_alumnos  WHERE lista1.id_materias=$idm and lista1.id_alumnos=".$al['id_alumnos']);
        $lista_rubros[]=$rubros;
        $lista_cal[]=$cals;
    }
    header("Content-Type: application/json");
    echo json_encode(array($lista,$lista_rubros,$lista_cal));
}else{
    header("Content-Type: application/json",null,400);
    echo json_encode(array("message"=>"Petición incorrecta"));
}

?>