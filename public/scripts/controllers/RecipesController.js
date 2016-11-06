angular.module('app')
.controller('RecipesController',['dataService','$http',function(dataService,$http){
	var self = this;
	self.getRecipes = function(){
		self.recipes = dataService.query();
		self.AllRecipes = self.recipes;
	}
	self.getRecipes();
	self.getRecipesByCategory = function(){
		if(self.recipe === null){
			return self.getRecipes();
		}
		self.AllRecipes = dataService.query({category:self.recipe.category});
	}
	
}]);