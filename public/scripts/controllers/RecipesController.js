(function(){
	angular.module('app')
	.controller('RecipesController',['dataService','$location',function(dataService,$location){
		var self = this;
		//Get all the categories and assign them to self.categories
		dataService.getCategories(function(categories){
			self.categories = categories;
		});
		//Get all the recipes and assign them to self.AllRecipes
		self.getRecipes = function(){
			self.AllRecipes = dataService.getRecipes(); //For the main Div, create another variable self.AllRecipes
		};
		self.getRecipes(); //RUN THE getRecipes() FUNCTION WHEN THE PAGE LOADS

		//GET ALL THE RECIPES BY CATEGORY SELECTED FROM THE SELECT BOX WHEN THERE IS A CHANGE ON THE SELECT BOX
		self.getRecipesByCategory = function(){
			//If the 'ALL CATEGORIES' option is selected
			//self.recipe is the ng-model of the select box
			if(self.recipe === null){
				return self.getRecipes(); //update the main div with ALL the recipes
			}
			//if another option is selected then show the appropriate recipes that match the category
			self.AllRecipes = dataService.getRecipesByCategory(self.category);  //UPDATES THE MAIN DIV WITH THE NEW RECIPE DATA ACCORDING TO SELECTED CATEGORY
		};

		//SEND THE USER TO THE ADD PAGE WHEN THEY CLICK THE +ADD BUTTON
		self.addRecipe = function(){
			$location.path('/add');//Send them to the Add page
		};
		//Send the user to the edit page when they click the recipe or the edit button
		self.editRecipe = function(recipe){
			$location.path('/edit/'+recipe._id);
		};

		//DELETES THE SELECTED RECIPE BY ID
		self.deleteRecipe = function(id){
			dataService.deleteRecipe(id,self.getRecipes);
		};
		
	}]);
}());
