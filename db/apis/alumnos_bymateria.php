<?php
require '../quey.php';

if (isset($_GET['id_materia'])){
    $idm=$_GET['id_materia'];
    $lista=consultaSQL("SELECT * from lista1 WHERE lista1.id_materias=$idm");
    $lista_rubros=[];
    $lista_cal=[];
    
    foreach($lista as $al){
        $rubros=consultaSQL("SELECT * FROM rubros where fk_id_materia=$idm and fk_id_alumno=".$al['id_alumnos']." order by bloque asc");
        $cals=consultaSQL("SELECT * FROM `calificaciones` where fk_id_materia=$idm and fk_id_alumno=".$al['id_alumnos']);
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