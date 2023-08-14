let userID='';
let userNC="";

fetch('../db/apis/check_login.php')
.then(response=>response.json())
.then(data=>{
    if(data.nivel===1){
        window.location.href="../Administrador/docentes.html";
        return;
    }else if(data.nivel===2){
        window.location.href="../docentes/materias.html";
        return;
    }else if(data.nivel===3){
        userID=data.id;
        userNC=data.user;
        return;
    }
    console.log(data.nivel);
})
.catch(error=>{
    window.location.href="../index.html";
});