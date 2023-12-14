import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getAllRecipes();
    this.http
      .put(
        'https://ng-recipe-book-db-9844c-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((recipeAddedResponse) => {
        console.log(recipeAddedResponse);
      });
  }

  fetchAllRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-recipe-book-db-9844c-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.addRecipesToArray(recipes);
        })
      );
  }
}