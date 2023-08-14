<?php
require '../quey.php';
if (isset($_GET['id'])){
    $id_al=$_GET['id'];
    $lista=consultaSQL("select alumnos.id_alumnos,alumnos.matricula, CONCAT(alumnos.nombre,' ',alumnos.apellido_p,' ',alumnos.apellido_m)as nombre_alumno, grupos.grado,grupos.nombre_grupo,grupos.tutor,CONCAT(docentes.nombre,' ',docentes.apellido_p,' ',docentes.apellido_m) as nombre_tutor  from alumnos join grupos on alumnos.fk_id_grupo=grupos.id_grupo join docentes on grupos.tutor=docentes.id_docente WHERE alumnos.id_alumnos=$id_al;");
    $materias= consultaSQL("SELECT materias.*,alumnos.* from materias join grupos on materias.fk_id_grupo=grupos.id_grupo join alumnos on alumnos.fk_id_grupo=grupos.id_grupo WHERE alumnos.id_alumnos=".$lista[0]['id_alumnos']) ;

    for($i=0;$i<count($materias);$i++){
        $m=$materias[$i];

    
        $sum=consultaSQL("SELECT COALESCE(sum(calificaciones.calificacion),0)/3 as suma  from calificaciones where calificaciones.fk_id_alumno=$id_al    and calificaciones.fk_id_materia=".$m['id_materias'])[0]['suma'];
        $materias[$i]['Promedio']=floatval($sum);
    }
    header("Content-Type: application/json");
    echo json_encode([$lista[0],$materias]);
}else{
    header("Content-Type: application/json", null, 400);
        echo json_encode(array('message' => 'Error'));

}
?>