angular.module('app')
.controller('RecipeDetailController',['recipeService','$location',function(recipeService,$location){
	var self = this;

	self.recipe = recipeService.recipe;
	console.log(self.recipe)
	
	//WEHEN THE USER CLICKS THE CANCEL BUTTON TAKE THEM TO THE MAIN PAGE
	self.cancelButton = function(){
		$location.path('/');
	}

	
}]);