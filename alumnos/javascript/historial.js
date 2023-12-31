document.body.onload=setTimeout(function(){
    const urlSearchParams = new URLSearchParams(window.location.search);
    const id_materia = urlSearchParams.get("id");
    const table_body = document.getElementById("table_body");

    fetch(`../db/apis/alumno_materia.php?id_materia=${id_materia}&id_alumno=${userID}`)
        .then(response => response.json())
        .then(data => {
            let alumnos_list = data[0];

            document.getElementById("matricula").value=alumnos_list[0].matricula;
            document.getElementById("nombre").value=alumnos_list[0].nombre_alumno;
            document.getElementById("materia").value=alumnos_list[0].nombre_materia;
            document.getElementById("docente").value=alumnos_list[0].nombre_docente;
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
                    inputtd.className="rubroparcial"+rubros.bloque;
                    inputtd.id = rubros.id_rubro;
                    inputtd.value = rubros.cal_final;
                    inputtd.max=10;
                    inputtd.min=0;
                    inputtd.readOnly=true;

                    inputtd.addEventListener("change",function(){
                        let inputs=inputtd.parentElement.parentElement.getElementsByClassName(inputtd.className);
                        let hs=inputtd.parentElement.parentElement.getElementsByClassName("perparcial"+rubros.bloque);
                        let calParcial=0;
                        for (let k=0;k<inputs.length;k++){
                            calParcial+=(parseFloat (inputs[k].value)*parseFloat(hs[k].value) )/100
                        }
                        inputtd.parentElement.parentElement.querySelector(".parcial"+rubros.bloque).value=calParcial;

                        let parenttr=inputtd.parentElement.parentElement;
                            let p1=parseFloat( parenttr.querySelector(".parcial1").value);
                            let p2=parseFloat( parenttr.querySelector(".parcial2").value);
                            let p3=parseFloat( parenttr.querySelector(".parcial3").value);

                            parenttr.querySelector(".Promedio").value=((p1+p2+p3)/3).toFixed(2);

                    })

                    

                    tdrubro.appendChild(inputtd);

                    let hid=document.createElement("input");
                    hid.type="hidden";
                    hid.className="perparcial"+rubros.bloque;
                    hid.value=rubros.valor;

                    tdrubro.append(hid);

                    newtr.append(tdrubro);

                    if ((j + 1) % norubros === 0) {
                        let num_parcial = ((j + 1) / norubros) - 1;
                        console.log(cals[num_parcial]);
                        let buton = document.createElement("button");

                        if (cals[num_parcial] == undefined) {
                            cals[num_parcial] = {
                                id_calificacion: "",
                                calificacion: 0

                            }
                            buton.className = "subir-button";
                            buton.innerHTML = "Subir";

                           
                        } else {
                            buton.className = "subir-button";
                            buton.innerHTML = "Subir";

                            
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
                        inputparcial.className="parcial"+(num_parcial+1);
                        inputparcial.id = cals[num_parcial].id_calificacion;
                        inputparcial.value = cals[num_parcial].calificacion;
                        inputparcial.readOnly=true;
                        inputparcial.max=10;
                        inputparcial.min=0
                        

                        tdparcial.append(inputparcial)

                        


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
                inputf.readOnly=true;
                inputf.className="Promedio";

                tdFinal.appendChild(inputf);

                newtr.appendChild(tdFinal);

                inputf.value=( (parseFloat(newtr.querySelector(".parcial1").value)+parseFloat(newtr.querySelector(".parcial2").value)+parseFloat(newtr.querySelector(".parcial3").value))/3).toFixed(2) ;
                // console.log(newtr.querySelector(".parcial1"));

                table_body.appendChild(newtr);

            }
        })
        .catch(error => {

        });
},1000)