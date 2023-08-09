const nombreI = document.getElementById("nombreInput");
const apellidopI = document.getElementById("apellidopInput");
const apellidomI = document.getElementById("apellidomInput");
const ncontrolI = document.getElementById("matriculaInput");
const contraI = document.getElementById("passInput");
const contra2I = document.getElementById("pass2Input");
const fotoI = document.getElementById("fotoInput");
const foto64I = document.getElementById("foto64");

const btn = document.getElementById("btnSend");

btn.addEventListener("click", function () {
   
    if (nombreI.value.trim() !== "" && apellidopI.value.trim() !== "" && apellidomI.value.trim() !== "" && ncontrolI.value.trim() !== "" && contraI.value.trim() !== "" && contra2I.value.trim() !== ""&&foto64.value!=="") {
        if (contraI.value !== contra2I) {
            alert("Lascontraseñas no coinciden");
            contra2I.value="";
            contra2I.focus();
            return;
        }

        fetch()
        .then()
        .then()
        .catch();

    }
});

function cargarFoto(event) {
    var archivo = event.target.files[0];
    var lector = new FileReader();

    lector.onload = function(e) {
      

      var imagenBase64 = e.target.result; // Imagen en formato base64
      var calidadCompresion = 0.7; // Calidad de compresión: 0.7

      comprimirImagenBase64(imagenBase64, calidadCompresion, function(imagenComprimidaBase64) {
        console.log("entramos");

        comprimida = imagenComprimidaBase64;
        console.log(comprimida.split(',')[1]);
        foto64I.value = comprimida.split(',')[1];


      });

      // Guardar la imagen en Base64
      // Puedes enviarla a través de una solicitud AJAX a tu servidor o usarla según tus necesidades
    };

    lector.readAsDataURL(archivo);
  }

  function comprimirImagenBase64(imagenBase64, calidadCompresion, callback) {
    var imagen = new Image();

    imagen.onload = function() {
      var canvas = document.createElement('canvas');
      var contexto = canvas.getContext('2d');

      var anchoOriginal = imagen.width;
      var altoOriginal = imagen.height;
      var maxDimension = 800;

      // Redimensionar la imagen proporcionalmente si excede las dimensiones máximas
      if (anchoOriginal > maxDimension || altoOriginal > maxDimension) {
        var proporcion = anchoOriginal / altoOriginal;

        if (anchoOriginal > altoOriginal) {
          canvas.width = maxDimension;
          canvas.height = maxDimension / proporcion;
        } else {
          canvas.width = maxDimension * proporcion;
          canvas.height = maxDimension;
        }
      } else {
        canvas.width = anchoOriginal;
        canvas.height = altoOriginal;
      }

      contexto.drawImage(imagen, 0, 0, canvas.width, canvas.height);

      var imagenComprimidaBase64 = canvas.toDataURL('image/jpeg', calidadCompresion);

      // Llamar al callback con la imagen comprimida en base64
      callback(imagenComprimidaBase64);
    };

    imagen.src = imagenBase64;
  }
