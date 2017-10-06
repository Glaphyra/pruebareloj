//nuevo modulo para filtros
var filtros = angular.module("filtros", []);

//crear un filtro para evitar duplicados con la función filter del modulo
	//primer argumento identificador
	//segundo argumento callback
filtros.filter("noduplicados", function() {
	//devolvemos lo que devuelva la funcón de creacion
		//primer argumento matriz
		//segundo argumento propiedad
	return function(array, propiedad) {
		if (angular.isArray(array) && angular.isString(propiedad)) {
			var marcas = [];
			var claves = [];
			
			for (var i = 0 ; i < array.length ; i++) {
				//recuperar propiedad
				var marca = array[i][propiedad];
				
				//comprobar que no está en el array
				//angular.usUndefinded devuelve false si no está. es como el indexOf-1
				if (angular.isUndefined(claves[marca])) {
					//no existe
					claves[marca] = true;
					marcas.push(marca);
				}
			}
			return marcas;
		}
		return array;
	};
});

//filtro paginar para ver una cantidad limitada de elementos por página y argumentos nombre y callback con servicio $filter
filtros.filter("paginar", ["$filter", function($filter){
	//devuelve el resultado de una función con argumentos
		//1: array de elementos a filtrar
		//2: pagina que queremos visualizar
		//3: elementos por página
	return function(array, pagina, elementos) {
		//compobar que los datos son correctos (array, numero y numero)
		if (angular.isArray(array) && angular.isNumber(pagina) && angular.isNumber(elementos)) {
			//indice del primer elemento
			var indice = (pagina-1) * elementos;
			
			//si el numero de elementos en array es menor que el primer indice, devolvemos matriz vacia
			if (array.lenght < indice)
				return [];
			else
				return $filter("limitTo")(array.splice(indice, elementos));
				//usamos el filtro limitTo para devir los elementos que se ven del array
					//le pasamos los elementos con la función slice (cortar el array)
					//desde el elemento inicial y el numero de elementos adicionales que queramos
		}
		//si los argumentos no son correctos, revolvemos el array
		return array;
	}
}]);


//filtro numeroPaginas para generar botones con el numero de paginas a visualizar por la limitación de elementos (filtro anterior)
//argumentos nombre y callback con servicio $filter
filtros.filter("numeroPaginas", ["$filter", function($filter){
	//devuelve el resultado de una función con argumentos
		//1: array de elementos a filtrar
		//2: elementos por página
	return function(array, elementos) {
		//compobar que los datos son correctos (array y numero)
		if (angular.isArray(array) && angular.isNumber(elementos)) {
			//devolver una matriz con la cantidad de páginas
			var numerosPagina = [];
			
			//calcular cantidad de paginas: elementos del array entre elementos por página redondeado hacia arriba
			var maxElementos = Math.ceil(array.length / elementos);
			
			//añadir cada numero a la matriz
			//el +1 a se hace al visualizar
			for (var i = 0 ; i < maxElementos ; i++) {
				numerosPagina.push(i);
			}
			return numerosPagina;
		}
		//si los argumentos no son correctos, revolvemos el array
		return array;
	}
}]);