var relojesAppCtrl = app.controller("listaRelojesAppCtrl", ["$scope", function($scope) {
	var marcaSeleccionada = null;
	$scope.paginaSeleccionada = 1;
	$scope.maxElementos = 3;
	$scope.maxElementosString = "3";
	$scope.maxElementosToNumber = function() {
		$scope.maxElementos = Number($scope.maxElementosString);
		$scope.paginaSeleccionada = 1;
	}

	$scope.seleccionarMarca = function(nuevaMarca) {
		//comprobar si viene parametro
		if (!angular.isDefined(nuevaMarca)) {
			//boton de inicio
			marcaSeleccionada = null
		} else {
			marcaSeleccionada = nuevaMarca;
		}
		//volver a la pagina 1 al cambiar el array
		$scope.paginaSeleccionada = 1;
	};

	$scope.resaltarMarca = function(nuevaMarca) {
		//devolvemos clase CSS (Bootstrap) para seleccionar boton. Clase btn-primary para resaltar
		return marcaSeleccionada === nuevaMarca ? "btn-primary" : "";
	};

	//filtrar los relojes según marca seleccionada
	$scope.filtrarMarca = function(reloj) {
		//devolvemos true si coincide con la marca seleccionada o si no hay ninguno seleccionado
		return marcaSeleccionada === null || marcaSeleccionada === reloj.marca;
	};
	
	$scope.seleccionarPagina = function(index) {
		//actualizar pagina seleccionada con el boton seleccionado
		$scope.paginaSeleccionada = index;
	};
	
	$scope.resaltarPagina = function(index) {
		//reslatar la pagina seleccionada con clase CSS
		return $scope.paginaSeleccionada === index ? "btn-primary" : "";
	};
}]);