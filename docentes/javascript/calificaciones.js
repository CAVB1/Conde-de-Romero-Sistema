document.body.onload = setTimeout(function () {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const id_materia = urlSearchParams.get("id_materia");

    const inputs_materia=document.querySelector(".cards-container").querySelector(".card").getElementsByTagName("input");

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
                if(element.id_docente==userID){
                    inputs_materia[0].value=element.nombre_materia;
                    inputs_materia[1].value=element.Grupo;
                }
            });
        })
        .catch(error => {
            console.error("AÑA");
        });
},1000); 