//Obtener las referencias de los elementos del formulario
const vsku=document.getElementById('txtSku');
const vnombre=document.getElementById('txtNombre');
const vautor=document.getElementById('txtAutor');
const vimagen=document.getElementById('txtImagen');
const vguardar=document.getElementById('btnGuardar');

//Obtener la información del archivo
var info_imagen=null;
vimagen.addEventListener('change',function(){
	let info=new FileReader();
	info.readAsDataURL(this.files[0]);

	info.onloadend=function(){
		info_imagen=info.result;
	}
});

vguardar.addEventListener('click',function(){
	//Realizar la peticion HTTP(POST) mediante el API FETCH
	fetch('http://localhost/app_web_v2/php/script_form_libros.php',{
		method:"POST",
		headers:{
			"Content-type":"application/json; charset=utf-8"
		},
		body:JSON.stringify({
			_sku:vsku.value,
			_nombre:vnombre.value,
			_autor:vautor.value,
			_imagen:info_imagen
		})
	})
	.then(function(respuesta){
		return respuesta.json();
	})
	.then(function(json){
		console.log(json);
		document.getElementById('contenido_libro').innerHTML="";
		let contenido=``;
		json.forEach(function(info){
			contenido+=`<div class='col s4'>
							<div class='card'>
								<div class='card-image'>
									<img src='${info.c_imagen}'/>
								</div>
								<div class='card-content'>
									<p>${info.c_sku}</p>
									<p>${info.c_nombre}</p>
									<p>${info.c_autor}</p>
								</div>
							</div>
						</div>`
		});

		document.getElementById('contenido_libro').innerHTML=contenido;
	})
	.catch(function(err){
		console.error("Error: ",err);
	});
});

document.addEventListener('DOMContentLoaded',function(){
	fetch('http://localhost/app_web_v2/php/script_info_libros.php')
	.then(function(respuesta){
		return respuesta.json();
	})
	.then(function(json){
		document.getElementById('contenido_libro').innerHTML="";
		let contenido=``;
		json.forEach(function(info){
			contenido+=`<div class='col s4'>
							<div class='card'>
								<div class='card-image'>
									<img src='${info.c_imagen}'/>
								</div>
								<div class='card-content'>
									<p>${info.c_sku}</p>
									<p>${info.c_nombre}</p>
									<p>${info.c_autor}</p>
								</div>
							</div>
						</div>`
		});

		document.getElementById('contenido_libro').innerHTML=contenido;
	})
	.catch(function(err){
		console.error("Error: ",err);
	});
});
