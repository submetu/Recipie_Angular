(function(){
	angular.module('app') 
	//Define a service called dataService with dependency of another service named ajaxService
	.service('dataService',['ajaxService',function(ajaxService){
		//function to get all recipes
		this.getRecipes = function(){
			return ajaxService.query();
		}
		//funciton to get all recipes by category
		this.getRecipesByCategory = function(category){
			return ajaxService.query({category:category});
		};
		//function to get a recipe by id
		this.getRecipe = function(id){
			return ajaxService.get({id:id});
		};
		//function to get an array of all the ingredients from which we can access properties such as
		// footItem, condition and amount
		this.getIngredients = function(callback){
			return ajaxService.query(function(resp){ 
				var ingredients=[];
				for(var i =0;i<resp.length;i++){
					for(var j=0;j<resp[i].ingredients.length;j++){
						ingredients.push(resp[i].ingredients[j]);
					}
				}
				callback(ingredients);
			});
		};
		//function to get all the categories available
		this.getCategories = function(callback){
			var categories = []
			ajaxService.query(function(resp){
				for(var i = 0; i<resp.length;i++){
					categories.push(resp[i].category);
				}
				categories = categories.filter(function(item, pos) {
				    return categories.indexOf(item) == pos;
				})
				callback(categories);
			});
		}
		//function to delete a recipe from the database based on id
		this.deleteRecipe = function(id,func){
			var r = confirm("Are you sure you want to delete this recipe?");
			if (r == true) {
			    ajaxService.delete({id:id},function(resp){
					func(); //this function is run when the DELETE request was successful
				},function(error){
					console.log(error)
				});
			}
		}
		//function to save a recipe in the database that takes in a the recipe to be saved and self and $location parameters
		this.saveRecipe = function(recipe,self,$location){
			if(recipe._id){ //if the recipe already exists, then make a PUT request to update it
				ajaxService.update({id:recipe._id},recipe,function(resp){
					$location.path('/'); //move the user to the homepage
				},function(error){
					self.errors = error.data.errors; //in case of errors, show them on the screen
				});
			}
			else{ //if the recipe is new, then make a POST request to create a new recipe in the databse
				//Create the following variables if they don't already exist
				recipe.description = recipe.description || ""; 
				recipe.prepTime = recipe.prepTime || 0;
				recipe.cookTime = recipe.cookTime || 0;
				//make the POST request
				ajaxService.save(recipe,function(resp){
					$location.path('/');
				},function(error){
					self.errors = error.data.errors;
				});
			}
		}
	}]);
}());
