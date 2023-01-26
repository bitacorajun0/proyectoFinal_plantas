function guardar() {
 
    let n = document.getElementById("txtNombre").value
    let u = document.getElementById("txtUsuario").value
    let m = document.getElementById("txtMail").value
    let c = document.getElementById("txtComentario").value
 
    let producto = {
        nombre: n,
        usuario: u,
        mail: m,
        comentario: c
    }
    let url = "https://laffarguej.pythonanywhere.com/productos"
    var options = {
        body: JSON.stringify(producto),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
       // redirect: 'follow'
    }
    fetch(url, options)
        .then(function () {
            console.log("creado")
            alert("¡Gracias por suscribirte, pronto tendras novedades!")
            //window.location.href = "/CodoaCodo/FrontEnd/PanelAdministracion.html";
            // Handle response we get from the API
        })
        .catch(err => {
            //this.errored = true
            alert("Error al grabar" )
            console.error(err);
        })
 
}
