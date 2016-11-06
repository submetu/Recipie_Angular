angular.module('app')
.controller('RecipesController',['dataService',function(dataService){
	console.log('From RecipesController');
	this.recipes = dataService.query();
	console.log(this.recipesFromCateogry);
	
}]);