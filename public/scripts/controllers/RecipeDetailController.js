(function(){
	angular.module('app')
	.controller('RecipeDetailController',['dataService','$location','$routeParams',function(dataService,$location,$routeParams){

		var self = this;
		//If the route was '/add' then make the self.recipe object empty.
		//If the route was '/edit/' then get the id and make a request to the server to get that recipe and put it into self.recipe
		self.recipe = ($location.path()==='/add') ? {} : dataService.getRecipe($routeParams.id) ; 
		//get all the categories and assign them to self.categories
		dataService.getCategories(function(categories){
			self.categories = categories;
		});
		
		//GET ALL THE INGREDIENTS IN ALL THE RECIPES AND SET THEM TO self.ingredients
		dataService.getIngredients(function(ingredients){
			self.ingredients = ingredients;
		});
		
		//WEHEN THE USER CLICKS THE CANCEL BUTTON TAKE THEM TO THE MAIN PAGE
		self.cancelButton = function(){
			$location.path('/');
		};
		//Add an ingredient row when Add ingredient button is pressed
		self.addIngredient = function(){
			var ingredientObject={
				foodItem:null,
				condition:null,
				amount:null
			}
			self.recipe.ingredients = self.recipe.ingredients || []; //If there is no ingredients array, create an empty array
			self.recipe.ingredients.push(ingredientObject);
		};
		//Add a step row when the Add step button is pressed
		self.addStep = function(){
			var stepObject={
				description:null
			}
			self.recipe.steps = self.recipe.steps || []; //If there is no steps array, create an empty array
			self.recipe.steps.push(stepObject);
		};
		//Delete the appropriate element from ng-repeat when a delete button is pressed
		self.deleteElement = function(array,index){
			array.splice(index,1);
		};
		//save the recipe when the Save Recipe button is pressed and move the user to the main page or give errors if there are
		self.saveRecipe = function(recipe){
			dataService.saveRecipe(recipe,self,$location);
		}
	}]);
}());
