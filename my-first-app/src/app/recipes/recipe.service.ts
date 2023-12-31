import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipeChanges = new Subject<Recipe[]>();
  // recipes: Recipe[] = [
  //   new Recipe(
  //     'pasta',
  //     'you will need this for pasta',
  //     'https://www.lastingredient.com/wp-content/uploads/2016/08/burst-tomato-pasta15-819x1024.jpg',
  //     [new Ingredient('tomatoes', 5), new Ingredient('pasta', 1)]
  //   ),
  //   new Recipe(
  //     'unga',
  //     'you will need this for ugali',
  //     'https://zambiankitchen.com/wp-content/uploads/2023/07/20230819_104846_0000.png',
  //     [new Ingredient('maize flour', 1), new Ingredient('water', 1)]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  addRecipesToArray(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanges.next(this.recipes.slice());
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  getAllRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanges.next(this.recipes.slice());
  }

  updateRecipe(id: number, newRecipe: Recipe) {
    this.recipes[id] = newRecipe;
    this.recipeChanges.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipeChanges.next(this.recipes.slice());
  }

  moveIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
