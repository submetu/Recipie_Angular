angular.module('app')
.controller('RecipeDetailController',['recipeService','$location','dataService',function(recipeService,$location,dataService){
	var self = this;
	self.recipe = recipeService.recipe; //THE RECIPE THAT WAS CLICKED TO BE EDITED
	
	// console.log(self.recipe.category)
	self.allRecipes = dataService.query(); //GET ALL THE RECIPES
	//GET ALL THE INGREDIENTS IN ALL THE RECIPES AND SET THEM TO self.ingredients
	self.selectIngredients = dataService.query(function(resp){ 
		var ingredients=[];
		for(var i =0;i<resp.length;i++){
			for(var j=0;j<resp[i].ingredients.length;j++){
				ingredients.push(resp[i].ingredients[j]);
			}
		}
		self.ingredients = ingredients;
	});
	

	//WEHEN THE USER CLICKS THE CANCEL BUTTON TAKE THEM TO THE MAIN PAGE
	self.cancelButton = function(){
		$location.path('/');
	}

	
}]);