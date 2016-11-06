angular.module('app')
.controller('RecipeDetailController',['recipeService','$location','dataService',function(recipeService,$location,dataService){
	var self = this;

	self.recipe = recipeService.recipe; //THE RECIPE THAT WAS CLICKED TO BE EDITED
	
	// console.log(self.recipe.category)
	self.selectRecipes = dataService.query(); //GET ALL THE RECIPES

	self.defaultSelect = function(){
		for(var recipe in self.selectRecipes){
			if(self.recipe.category === recipe.category){
				return recipe.category;
			}
		}
	}


	//WEHEN THE USER CLICKS THE CANCEL BUTTON TAKE THEM TO THE MAIN PAGE
	self.cancelButton = function(){
		$location.path('/');
	}

	
}]);