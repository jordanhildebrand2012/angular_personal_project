import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  itemSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe(
      'pasta',
      'you will need this for pasta',
      'https://www.lastingredient.com/wp-content/uploads/2016/08/burst-tomato-pasta15-819x1024.jpg',
      [new Ingredient('tomatoes', 5), new Ingredient('pasta', 1)]
    ),
    new Recipe(
      'unga',
      'you will need this for ugali',
      'https://zambiankitchen.com/wp-content/uploads/2023/07/20230819_104846_0000.png',
      [new Ingredient('maize flour', 1), new Ingredient('water', 1)]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  getAllRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  moveIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
