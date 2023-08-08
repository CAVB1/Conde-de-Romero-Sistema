document.body.onload = function () {
    const tmaterias=document.getElementById("t_materias");
    const urlSearchParams = new URLSearchParams(window.location.search);
    const id = urlSearchParams.get("id");
    const photo=document.getElementById("photo");
    const inombre=document.getElementById("nombre");
    const inocontrol=document.getElementById("nocontrol");
    const itutorado=document.getElementById("tutorado");
    fetch(`../db/apis/ver_docente.php?id=${id}`)
        .then(response => response.json())
        .then(data => {
            inombre.value=data.nombre;
            inocontrol.value=data.no_control;
            itutorado.value=data.tutorado;

        })
        .catch(error => {
            alert("Ha habido un error.\nRecarga la página");
        });

        fetch(`../db/apis/ver_docente.php?id=${id}`)
        .then(response => response.json())
        .then(data => {
            datos=data[0];
            materias=data[1];

            inombre.value=datos.nombre;
            inocontrol.value=datos.no_control;
            itutorado.value=datos.tutorado;

            materias.forEach(element => {
                let tr=document.createElement("tr");
                
                let rgrupo=document.createElement("td");
                let rmateria=document.createElement("td");

                rgrupo.innerHTML=element.Grupo;
                rmateria.innerHTML=element.nombre_materia;

                tr.appendChild(rgrupo);
                tr.appendChild(rmateria);

                tmaterias.appendChild(tr);
            });



        })
        .catch(error => {
            alert("Ha habido un error.\nRecarga la página");
        });
}