angular.module('app')
.controller('RecipesController',['dataService','$http','$location','recipeService',function(dataService,$http,$location,recipeService){
	var self = this;
	//GET ALL RECIPES AND ASSIGN THEM TO THE SELECT OPTIONS AND THE MAIN DIV
	self.getRecipes = function(){
		self.recipes = dataService.query();
		self.AllRecipes = self.recipes;
	};
	self.getRecipes(); //RUN THE getRecipes() FUNCTION WHEN THE PAGE LOADS

	//GET ALL THE RECIPES BY CATEGORY SELECTED FROM THE SELECT BOX
	self.getRecipesByCategory = function(){
		//If the 'ALL CATEGORIES' option is selected
		if(self.recipe === null){
			return self.getRecipes();
		}
		self.AllRecipes = dataService.query({category:self.recipe.category}); //UPDATES THE MAIN DIV WITH THE NEW RECIPE DATA 
	};

	//SEND THE USER TO THE ADD PAGE WHEN THEY CLICK THE +ADD BUTTON
	self.addRecipe = function(){
		recipeService.recipe=null; //MAKE THE recipe OBJECT EMPTY SO THAT THE /add PAGE HAS NO DATA
		$location.path('/add');
	};
	self.editRecipe = function(recipe){
		recipeService.recipe = recipe; //MAKE THE recipe OBJECT EQUAL TO THE RECIPE OBJECT OF THE CLICKED RECIPE
		$location.path('/add');
	};

	//DELETES THE SELECTED RECIPE
	self.deleteRecipe = function(id){
		var r = confirm("Are you sure you want to delete this recipe?");
		if (r == true) {
		    dataService.delete({id:id},function(){
				self.getRecipes(); //AFTER DELETION, GIVE THE USER THE UPDATED RECIPE LIST
			});
		}
	};
	
}]);