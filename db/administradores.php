<?php
    class Administradores{
        public static function validateAdministrador($user, $passwd){
            include_once 'db_connection.php';
            $stmsql="SELECT * FROM administrador WHERE user=? AND passw=?;";
        
            $sql=$conexion->prepare($stmsql);
    
            $sql->bind_param('ss',$user,$passwd);
            $sql->execute();
    
            $result=$sql->get_result();
    
            if($result->num_rows>0){
                return TRUE;
            }else{
                return FALSE;
            }
        }
    }
?>