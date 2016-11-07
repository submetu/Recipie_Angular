(function(){
	angular.module('app')
	//A factory service for all the HTTP requests in the application
	.factory('ajaxService',['$resource',function($resource){
		return $resource('/api/recipes/:id',{id:"@id"},{
			update:{
				method:'PUT'
			}
		});
	}]);
}());
	