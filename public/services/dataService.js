angular.module('app')
.factory('dataService',['$resource',function($resource){
	return $resource('/api/recipes/:id',{id:"@id"},{
		update:{
			method:'PUT'
		}
	});
}]);