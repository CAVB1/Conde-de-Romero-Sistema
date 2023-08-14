document.body.onload=setTimeout(function(){
    let tbody=document.getElementById("tbody");
    fetch("../db/apis/alumno.php?id="+userID)
    .then(response=>response.json())
    .then(data=>{
        let al=data[0];
        document.getElementById("matricula").value=al.matricula;
        document.getElementById("nombre").value=al.nombre_alumno;
        document.getElementById("grado").value=al.grado;
        document.getElementById("grupo").value=al.nombre_grupo;
        document.getElementById("tutor").value=al.nombre_tutor;

        let materias=data[1];
        console.log(materias)

        
        materias.forEach(element => {
            let newtr=document.createElement("tr");
            let prom= parseFloat(element.Promedio).toFixed(2);
            newtr.innerHTML=`<td>${element.nombre_materia}</td>
            <td><input type="text" value="${prom}" readonly></td>
            <td class="ver-icon"><a href="../alumnos/historial.html?id=${element.id_materias}"><i class="fas fa-eye"></td>`;
            tbody.appendChild(newtr);
        });
    })
    .catch(error=>{

    });
},2000)