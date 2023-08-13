document.body.onload = setTimeout(function () {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const id_materia = urlSearchParams.get("id_materia");

    const table_body = document.getElementById("table_body");

    const inputs_materia = document.querySelector(".cards-container").querySelector(".card").getElementsByTagName("input");

    let rubros_module = document.getElementsByClassName("card")[1];

    fetch('../db/apis/get_norubros.php?id_materia=' + id_materia)
        .then(response => response.json())
        .then(data => {
            if (data.num > 0) {
                rubros_module.style.display = "none";
            }
        })
        .catch(error => {
            alert("error");

        });
    console.log(`../db/apis/materias_docente.php?nocontrol=${userID}`);

    fetch(`../db/apis/materias_docente.php?nocontrol=${userID}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                if (element.id_docente == userID) {
                    inputs_materia[0].value = element.nombre_materia;
                    inputs_materia[1].value = element.Grupo;
                }
            });
        })
        .catch(error => {
            console.error("AÑA");
        });

    fetch('../db/apis/alumnos_bymateria.php?id_materia=' + id_materia)
        .then(response => response.json())
        .then(data => {
            let alumnos_list = data[0];
            let rubros_list = data[1];
            const norubros = (rubros_list[0].length / 3);
            console.log(rubros_list[0].length / 3);
            document.querySelector("tr").querySelectorAll("th")[2].colSpan = norubros+1;
            document.querySelector("tr").querySelectorAll("th")[4].colSpan = norubros+1;
            document.querySelector("tr").querySelectorAll("th")[3].colSpan = norubros+1;
            let cal_list = data[2];


            for (let i = 0; i < alumnos_list.length; i++) {
                let alumno = alumnos_list[i];
                console.log(alumno.id_alumnos);

                let newtr = document.createElement("tr");

                let tdmatricula = document.createElement("td");
                let tdnombre = tdmatricula.cloneNode();

                tdmatricula.innerHTML = alumno.matricula;
                tdnombre.innerHTML = alumno.nombre_alumno;

                let alumno_rubros = rubros_list[i];
                let alumno_cals = cal_list[i];

                newtr.append(tdmatricula);
                newtr.append(tdnombre);

                // console.log(alumno_rubros);
                // console.log(alumno_cals);

                for (let j = 0; j < alumno_rubros.length; j++) {
                    let rubros = alumno_rubros[j];
                    let cals = alumno_cals;
                    

                    let tdrubro = document.createElement("td");
                    tdrubro.className = "label_cell";

                    let labeltd = document.createElement("label");
                    labeltd.className = "label";
                    labeltd.setAttribute("for", rubros.id_rubro);
                    labeltd.innerHTML = rubros.nombre_rubro;

                    tdrubro.append(labeltd);
                    let inputtd = document.createElement("input");
                    inputtd.type = "number";
                    inputtd.id = rubros.id_rubro;
                    inputtd.value = rubros.cal_final;

                    tdrubro.appendChild(inputtd);

                    newtr.append(tdrubro);

                    if ((j + 1) % norubros === 0) {
                        let num_parcial=((j + 1) / norubros)-1;
                        console.log(cals[num_parcial]);
                        if(cals[num_parcial]==undefined){
                            cals[num_parcial]={
                                id_calificacion:"",
                                calificacion: 0

                            }
                        }
                        
                        // console.log("id " + cals.id_calificacion);
                        let tdparcial = document.createElement("td");
                        tdparcial.className = "label-cell";

                        let labelparcial = document.createElement("label");
                        labelparcial.className = "label";
                        labelparcial.setAttribute("for", cals[num_parcial].id_calificacion);
                        labelparcial.innerHTML = "Calificación final";

                        tdparcial.appendChild(labelparcial);

                        let inputparcial = document.createElement("input");
                        inputparcial.type = "number";
                        inputparcial.id = cals[num_parcial].id_calificacion;
                        inputparcial.value = cals[num_parcial].calificacion;

                        tdparcial.append(inputparcial)

                        let buton=document.createElement("button");
                        buton.className="subir-button";
                        buton.innerHTML="Subir";

                        tdparcial.appendChild(buton);

                        newtr.append(tdparcial);
                    }





                }
                let tdFinal=document.createElement("td");
                tdFinal.className="dark-cell";

                let labelf=document.createElement("label");
                labelf.className="label";
                labelf.for=alumno.id_alumnos;
                labelf.innerHTML="Promedio final";

                tdFinal.appendChild(labelf);

                let inputf=document.createElement("input");
                inputf.type="number";
                inputf.id=alumno.id_alumnos;
                inputf.value=0;

                tdFinal.appendChild(inputf);

                newtr.appendChild(tdFinal);


                table_body.appendChild(newtr);

            }
        })
        .catch(error => {

        });
}, 1000); 