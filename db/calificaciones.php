<?php
include_once 'quey.php';

class Calificaciones{
    public static function InsertRubro($nombre_rubro,$id_materia,$valor, $bloque){
        include_once 'db_connection.php';

        $stmsql="INSERT INTO rubros(nombre_rubro, fk_id_materia,valor,bloque) VALUES('$nombre_rubro',$id_materia,$valor,'$bloque')";
        return $conexion->query($stmsql);
    }

    public static function getNoRubros($id_materia){
        return consultaSQL("SELECT COUNT(rubros.id_rubros) as no_rubros FROM rubros WHERE rubros.fk_id_materia=$id_materia")[0]['no_rubros'];
    }
}
?>