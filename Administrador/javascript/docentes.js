document.body.onload=(function (){
    const table=document.getElementById("table_list");
    fetch("../db/apis/lista_docentes.php")
    .then(response=>response.json())
    .then(data=>{
        data.forEach(element => {
            let td=document.createElement("tr");

            let r_nombre=document.createElement("td");
            let r_nocontrol=document.createElement("td");
            let r_accion=document.createElement("td");

            r_nombre.innerHTML=element.nombre;
            r_nocontrol.innerHTML=element.no_control;
            r_accion.innerHTML=`<a href="../Administrador/ver_docente.html?id=${element.id_docente}"><i class="fas fa-eye"></i></a>`;

            td.append(r_nombre);
            td.append(r_nocontrol);
            td.append(r_accion);

            table.append(td);

        });
    })
    .catch(error=>{
        alert("Ha habido un error.\nRecarga la página");
    });
});