import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
  @Output() selectedRecipeItemAfter = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe(
      'tomatoes',
      'you will need this for pasta',
      'https://www.lastingredient.com/wp-content/uploads/2016/08/burst-tomato-pasta15-819x1024.jpg'
    ),
    new Recipe(
      'unga - maize flour',
      'you will need this for ugali',
      'https://zambiankitchen.com/wp-content/uploads/2023/07/20230819_104846_0000.png'
    ),
  ];

  getRecipeItem(recipe: Recipe) {
    this.selectedRecipeItemAfter.emit(recipe);
  }
}
