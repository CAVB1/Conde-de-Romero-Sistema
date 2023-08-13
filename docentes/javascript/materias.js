document.body.onload= setTimeout(function(){
    
const matContainer=document.getElementById("materias-cont");
console.log(`../db/apis/materias_docente.php?nocontrol=${userID}`);
fetch(`../db/apis/materias_docente.php?nocontrol=${userID}`)
.then(response=>response.json())
.then(data=>{
    data.forEach(element => {
        let card=document.createElement("div");
        card.setAttribute("class","card");

        card.innerHTML=`<label >Grupo</label> <br><input type="text" placeholder="Grupo" value="${element.Grupo}" readonly ><label >Materia</label><br> <input type="text" placeholder="Materia" value="${element.nombre_materia}" ><button onclick="window.location.href=\'calificaciones.html?id_materia=${element.id_materias}\'">Entrar</button>`;
        // card.innerHTML=`añañaña`;

        matContainer.appendChild(card);
    });
})
.catch(error=>{
    console.error("AÑA");
});

},1000); 