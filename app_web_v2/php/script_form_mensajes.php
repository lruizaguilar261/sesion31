<?php
	header("Content-type: application/json; charset=utf-8");

	//Decodificar la informacion(JSON) obtenida del cliente
	$informacion=json_decode(file_get_contents("php://input"),true);

	//Enviando la respuesta al cliente(JSON)
	echo json_encode($informacion);

?>