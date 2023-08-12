fetch('./db/apis/check_login.php')
.then(repsonse=>repsonse.json())
.then(data=>{
    if(data.nivel===1){
        window.location.href="./Administrador/docentes.html";
        return;
    }else if(data.nivel===2){
        window.location.href="./docentes/materias.html";
        return;
    }else if(data.nivel===3){
        window.location.href="./alumnos/inicio.html";
        return;
    }
    console.log(data.nivel);
})
.catch(error=>{
    return;
});