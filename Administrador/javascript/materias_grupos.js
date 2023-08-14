document.body.onload=function(){
    const nombregrupoInput=document.getElementById("nombreGrupo");
    const nivelSelect=document.getElementById("nivelSelect");
    const gradoSelect=document.getElementById("gradoSelect");
    const tutorSelect=document.getElementById("tutorSelect");
    const btnGrupo=document.getElementById("btnGrupo");
    const bodyt=document.getElementById("bodyt");

    const nombremateriaInput=document.getElementById("nombreMateria");
    const docenteSelect=document.getElementById("docenteSelect");
    const grupoMateriaSelect=document.getElementById("grupoMateriaSelect");
    const btnMateria=document.getElementById("btnMateria");

    fetch("../db/apis/all_grupos.php")
    .then(response=>response.json())
    .then(data=>{
        const grupos = data[0];
        const materiasPorGrupo = data[1];

        console.log(grupos.length);

        for (let i = 0; i < grupos.length; i++) {
            console.log(grupos[i]);
            let newtr = document.createElement("tr");

            let grupo = document.createElement("td");
            grupo.innerHTML = "Grupo " + grupos[i]['nombre_grupo'];

            let nivel = document.createElement("td");
            nivel.innerHTML = grupos[i]['nivel'];

            let grado = document.createElement("td");
            grado.innerHTML = grupos[i]['grado']+"°";

            let tutor = document.createElement("td");
            tutor.innerHTML = grupos[i]['nombre_tutor'];

            let materiasCell = document.createElement("td");
            let materiasl = materiasPorGrupo[i];
            let gs = "";

            materiasl.forEach(element => {
                gs += element.nombre_materia + " ";
            });

            materiasCell.innerHTML = gs;

            newtr.appendChild(grupo);
            newtr.appendChild(nivel);
            newtr.appendChild(grado);
            newtr.appendChild(materiasCell);
            newtr.appendChild(tutor);

            bodyt.appendChild(newtr);
        }
       
        

    })
    .catch(error=>{
console.log("a")
    })

    fetch('../db/apis/lista_docentes.php')
    .then(response=>response.json())
    .then(data=>{
        data.forEach(element => {
            let option=document.createElement("option");
            let option2=document.createElement("option");

            option.value=element.id_docente;
            option.innerHTML=element.no_control+" - "+element.nombre+" "+element.apellido_p+" "+element.apellido_m;
            option2.value=element.id_docente;
            option2.innerHTML=element.no_control+" - "+element.nombre+" "+element.apellido_p+" "+element.apellido_m;


            
            tutorSelect.appendChild(option);
            docenteSelect.appendChild(option2);
        });
    })
    .catch(error=>{

    });

    fetch('../db/apis/grupos_formated.php')
    .then(response=>response.json())
    .then(data=>{
        data.forEach(element => {
            let option=document.createElement("option");
            
            option.value=element.id_grupo;
            option.innerHTML=element.nombre;
           


            
            grupoMateriaSelect.appendChild(option);
           
        });
    })
    .catch(error=>{

    });

    nivelSelect.addEventListener("change",function(){
        let nivel=nivelSelect.value;
        if(nivel===""){
            // gradoSelect.removeAttribute("disabled");
            gradoSelect.setAttribute("disabled",'');
        }else if(nivel==="Primaria"){
            gradoSelect.removeAttribute("disabled");
            gradoSelect.innerHTML='<option value="" disabled selected>Seleccionar grado</option><option value="1">Primero</option><option value="2">Segundo</option><option value="3">Tercero</option><option value="4">Cuarto</option><option value="5">Quinto</option><option value="6">Sexto</option>';

        }else if(nivel==="Preescolar"){
            gradoSelect.removeAttribute("disabled");
            gradoSelect.innerHTML='<option value="" disabled selected>Seleccionar grado</option><option value="1">Primero</option><option value="2">Segundo</option><option value="3">Tercero</option>';
            
        }else if(nivel==="Secundaria"){
            gradoSelect.removeAttribute("disabled");
            gradoSelect.innerHTML='<option value="" disabled selected>Seleccionar grado</option><option value="1">Primero</option><option value="2">Segundo</option><option value="3">Tercero</option>';
            
        }
    });

    btnGrupo.addEventListener("click",function(){
        let nombre=nombregrupoInput.value;
        let nivel=nivelSelect.value;
        let grado=gradoSelect.value;
        let tutor=tutorSelect.value;

        if(nombre.trim()!==""&&nivel!==""&&grado!==""&&tutor!==""){
            let body=new FormData();
            body.append('nombre',nombre);
            body.append('nivel',nivel);
            body.append('grado',grado);
            body.append('tutor',tutor);

            fetch('../db/apis/agregar_grupo.php',{
                method: 'POST',
                body:body
            })
            .then(response=>response.json())
            .then(data=>{
                alert("Resgistro completado");
                setTimeout(function(){window.location.href="materias_grupos.html"},200)
            })
            .catch(error=>{
                alert("Ha ocurrido un error en el registro\nIntentalo de nuevo")
            })
        }else{
            alert("Asegurate de llenar todos los campos");
        }

    });

    btnMateria.addEventListener("click",function(){
        let nombre=nombremateriaInput.value;
        let docente=docenteSelect.value;
        let grupo=grupoMateriaSelect.value;
        if(nombre.trim()!==""&&docente!==""&&grupo!==""){
            let body=new FormData;
            body.append("nombre",nombre);
            body.append("docente",docente);
            body.append("grupo", grupo);

            fetch("../db/apis/agregar_materia.php",{
                method:'POST',
                body:body
            })
            .then(response=>response.json())
            .then(data=>{
                alert("Resgistro completado");
                setTimeout(function(){window.location.href="materias_grupos.html"},200)
            })
            .catch(error=>{
                alert("Ha ocurrido un error en el registro\nIntentalo de nuevo")
            });
        }else{
            alert("Asegurate de llenar todos los campos");

        }
    });
};