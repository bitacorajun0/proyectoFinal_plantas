const contenedor = document.querySelector('#menuLateral');

document.querySelector('#boton-menu').addEventListener('click', () => {
	contenedor.classList.toggle('active');
	
});
const div = document.querySelector('#container');

document.querySelector('#boton-menu').addEventListener('click', () => {
	div.classList.toggle('active');
	
});


/*(/$(document).ready(main);

var contador=1;

function main(){
	$('boton-menu').click(function(){
		//$('nav').toggle();

		if(contador==1){
			$('nav').animate({
				left:'0'
			});
			contador=0;
			}else{
				contador=1;
				$('nav').animate({
					left:'-100%'
			});
		}
	});
}
*/
//Validación de formulario
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

if(formulario !== null){
	const expresiones = {
		nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
		correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		telefono: /^\d{7,14}$/ // 7 a 14 numeros.
	}
	
	const campos = {
		nombre: false,
		correo: false,
		telefono: false
	}
	
	const validarFormulario = (e) => {
		switch (e.target.name) {
			case "nombre":
				validarCampo(expresiones.nombre, e.target, 'nombre');
			break;
			case "correo":
				validarCampo(expresiones.correo, e.target, 'correo');
			break;
			case "telefono":
				validarCampo(expresiones.telefono, e.target, 'telefono');
			break;
		}
	}
	
	const validarCampo = (expresion, input, campo) => {
		if(expresion.test(input.value)){
			document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
			document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
			document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
			document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
			document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
			campos[campo] = true;
		} else {
			document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
			document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
			document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
			document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
			document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
			campos[campo] = false;
		}
	}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	if(campos.nombre && campos.correo && campos.telefono){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
		}, 5000);
	}
});

}

/*************************/ 
window.addEventListener('load', () => {
    let lon;
    let lat;

    let temperaturaValor = document.getElementById('tempValor');
    let temperaturaDescripcion = document.getElementById('tempDescripcion');

    let ubicacion = document.getElementById('location');
    let iconoClima = document.getElementById('locationEmoji');

    let vientoVelocidad = document.getElementById('velocViento');

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(posicion => {

            lon = posicion.coords.longitude
            lat = posicion.coords.latitude

            const url = `https://api.weatherapi.com/v1/current.json?key=9f02544d644a4ed2874180734221910&q=${lat},${lon}&lang=es&aqi=9f02544d644a4ed2874180734221910`

            fetch(url)
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    console.log(data)
                    ubicacion.innerHTML = `<h2>Ciudad:</h2><p> ${data.location.name}.</p>`
                    temperaturaValor.innerHTML = `La temperatura actual es de ${data.current.temp_c}°C,`;
                    temperaturaDescripcion.innerHTML = ` está ${data.current.condition.text}.`
                    iconoClima.src = `${data.current.condition.icon}`
                    vientoVelocidad.innerHTML = `La velocidad del viento es de ${data.current.wind_kph} km/h.`
                })
                .catch((error) => {
                    console.log(error)
                })
        })
    }
})

function mix(){
    guardar();
	Swal.fire('Gracias por suscribirte');
}