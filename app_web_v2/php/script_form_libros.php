<?php
	header("Content-type: appliaction/json; charset=utf-8");
	$info=json_decode(file_get_contents("php://input"),true);

	//Obtener los valores del objeto JSON
	$sku=$info['_sku'];
	$nombre=$info['_nombre'];
	$autor=$info['_autor'];
	$imagen=$info['_imagen'];

	//Variables de conexion a la BD
	$host="localhost";
	$bd="bd_web_mensaje";
	$usuario="root";
	$passwd="vertrigo";

	//***************** CONECTAR A LA BASE DE DATOS ********////
	try{
		//Establecer conexión con la BD
		$con=new PDO('mysql:host=localhost;dbname=bd_web_mensaje;charset=utf8',$usuario,$passwd);
		$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		//Preparar la setencia SQL (INSERT)
		$stm=$con->prepare("INSERT INTO tbl_libros(c_sku,c_nombre,c_autor,c_imagen) VALUES(:sku,:nombre,:autor,:imagen)");

		$arreglo_valores=array(":sku" => $sku, ":nombre" => $nombre, ":autor" => $autor, ":imagen" => $imagen);

		//Ejecutar la sentencia SQL insert
		$stm->execute($arreglo_valores);

		//************* OBTENER LOS REGISTROS DE LA TABLA tbl_libros *************//
			//Preparar las sentencia SQL (SELECT)
			$stm=$con->prepare("SELECT * FROM tbl_libros");

			//Ejecutar la setencia SQL
			$stm->execute();

			//Obtener los registros de la tabla
			$resgistros=array();
			while ($fila=$stm->fetch(PDO::FETCH_ASSOC)) {
				$registros[]=$fila;
			}

		//Cerrar conexion con la BD
		$stm=null;
		$con=null;

		
		echo json_encode($registros);


	}catch(PDOException $ex){
		echo "Error: ".$ex->getMessage();
	}
?>