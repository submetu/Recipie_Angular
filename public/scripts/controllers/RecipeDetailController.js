angular.module('app')
.controller('RecipeDetailController',['recipeService','$location','dataService',function(recipeService,$location,dataService){

	var self = this;
	self.recipe = recipeService.recipe || {}; //THE RECIPE THAT WAS CLICKED TO BE EDITED OR A NEW RECIPE WITH EMPTY OBJECT

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
	};

	self.addIngredient = function(){
		var ingredientObject={
			foodItem:null,
			condition:null,
			amount:null
		}
		self.recipe.ingredients = self.recipe.ingredients || []; //If there is no ingredients array, create an empty array
		self.recipe.ingredients.push(ingredientObject);
	};
	self.addStep = function(){
		var stepObject={
			description:null
		}
		self.recipe.steps = self.recipe.steps || []; //If there is no steps array, create an empty array
		self.recipe.steps.push(stepObject);
	};
	self.deleteElement = function(array,index){
		array.splice(index,1);
	};
	self.saveRecipe = function(recipe){
		if(recipe._id){
			dataService.update({id:recipe._id},recipe,function(resp){
				$location.path('/');
			});
		}
		else{
			recipe.description = recipe.description || "";
			recipe.prepTime = recipe.prepTime || 0;
			recipe.cookTime = recipe.cookTime || 0;

			dataService.save(recipe,function(resp){
				$location.path('/');
			},function(error){
				self.errors = error.data.errors;
			});
		}
		 
	}
}]);