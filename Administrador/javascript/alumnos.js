document.body.onload = function () {
    const select1 = document.getElementById("gruposGral");
    const select2 = document.getElementById("grupoSelectInd");
    const btnGral = document.getElementById("btnGral");
    const btnInd = document.getElementById("btnInd");

    const archivo = document.getElementById("file");

    const matriculaInput = document.getElementById("matriculaInput");
    const nombreInput = document.getElementById("nombreInput");
    const apellidopInput = document.getElementById("apellidopInput");
    const apellidomInput = document.getElementById("apellidomInput");
    const contraInput = document.getElementById("contrasenaInput");



    fetch('../db/apis/grupos_formated.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                let opt = document.createElement("option");
                opt.value = element.id_grupo;
                opt.innerHTML = element.nombre;
                let opt2 = document.createElement("option");
                opt2.value = element.id_grupo;
                opt2.innerHTML = element.nombre;

                select1.append(opt);
                select2.append(opt2);
            });
        })
        .catch(error => {
            alert("Ha habido un error, no se pueden cargar los grupos.");
            console.error(error);
        });

    btnGral.addEventListener("click", function () {
        if (archivo.files[0] <= 0
            || archivo.files[0] === null
            || archivo.files[0] === ""
            || archivo.files[0] === undefined || archivo.files[0] === "undefined"
            || archivo.files[0] === "null"
            || select1.value === "") {
            alert("Llena ambos campos");
            return;
        } else {
            const id_grupo = select1.value;
            const file = archivo.files[0];
            const reader = new FileReader();
            reader.onload = function (event) {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                // // Assuming the Excel file has only one sheet
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

                // const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

                // let outputText = '';

                // // Iterate through rows
                // rows.forEach(function(row, rowIndex) {
                //     outputText += `Row ${rowIndex + 1}: ${row.join(', ')}\n`;
                //     console.log(`Row ${rowIndex + 1}: ${row.join(', ')}\n`)
                // });

                // // Output rows to the element


                const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

                let outputText = '';

                // Get column names from the first row (header)
                const columnNames = rows[0];

                // Iterate through rows (skip the first row as it's the header)
                for (let rowIndex = 1; rowIndex < rows.length; rowIndex++) {
                    const row = rows[rowIndex];
                    const rowData = {};

                    // Map cell values to column names
                    columnNames.forEach((columnName, columnIndex) => {
                        rowData[columnName] = row[columnIndex];
                    });

                    // Access elements using row.nombre, row.edad, etc.
                    // console.log( `Row ${rowIndex}: ${JSON.stringify(rowData)}\n`);
                    // console.log( `Aña: ${JSON.stringify(rowData)}\n`);
                    if (rowData['Matricula'] !== undefined && rowData['Contrasena'] !== undefined && rowData['Nombre'] !== undefined && rowData['Apellido Paterno'] !== undefined && rowData['Apellido Materno'] !== undefined) {
                        let formData = new FormData();
                        formData.append('matricula', rowData['Matricula']);
                        formData.append('passwd', rowData['Contrasena']);
                        formData.append('nombre', rowData['Nombre']);
                        formData.append('apellidop', rowData['Apellido Paterno']);
                        formData.append('apellidom', rowData['Apellido Materno']);
                        formData.append('idgrupo', id_grupo);

                        fetch('../db/apis/agregar_alumno.php', {
                            method: 'POST',
                            body: formData
                        })
                            .then(response => response.json())
                            .then(data => {

                            })
                            .catch(error => {

                            });


                    } else {
                        console.error("Error");
                        alert("Ha ocurrido un error");
                        setTimeout(function () { window.location.href = "alumnos.html" }, 200);
                        return;
                    }


                }

                alert("Proceso terminado");
                setTimeout(function () { window.location.href = "alumnos.html" }, 200);

            };

            reader.readAsArrayBuffer(file);

        }
    });

    btnInd.addEventListener("click", function () {
        if (matriculaInput.value.trim() !== "" && nombreInput.value.trim() && apellidopInput.value.trim() !== "" && apellidomInput.value.trim() !== "" && contraInput.value.trim() !== "" && select2.value.trim() !== "") {
            let matricula = matriculaInput.value;
            let nombre = nombreInput.value;
            let apellidop = apellidopInput.value;
            let apellidom = apellidomInput.value;
            let contra = contraInput.value;
            let idgrupo = select2.value;

            let formData = new FormData();
            formData.append('matricula', matricula);
            formData.append('passwd', contra);
            formData.append('nombre', nombre);
            formData.append('apellidop', apellidop);
            formData.append('apellidom', apellidom);
            formData.append('idgrupo', idgrupo);

            fetch('../db/apis/agregar_alumno.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    alert("Registro completado");
                    setTimeout(function () { window.location.href = "alumnos.html" }, 500)
                })
                .catch(error => {
                    alert("Ha ocurrido un error\nIntentalo de nuevo")
                });
        } else {
            alert("Asegurate de llenar todos los campos");
            return;
        }
    });


};