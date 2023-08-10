<?php
function consultaSQL($sql) {
    require "db_connection.php";

    $conn = $conexion;

    if (!$conn) {
        die("Error al conectar a la base de datos: " . mysqli_connect_error());
    }

    $resultado = mysqli_query($conn, $sql);

    if (!$resultado) {
        die("Error al ejecutar la consulta: " . mysqli_error($conn));
    }

    $datos = array();

    while ($fila = mysqli_fetch_assoc($resultado)) {
        $datos[] = $fila;
    }

    mysqli_close($conn);

    return $datos;
}
?>