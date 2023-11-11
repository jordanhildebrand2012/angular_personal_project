import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  itemSelect!: Recipe;
  private subscription!: Subscription;

  constructor(private recipeService: RecipeService) {}
  ngOnInit(): void {
    this.subscription = this.recipeService.itemSelected.subscribe(
      (recipe: Recipe) => {
        this.itemSelect = recipe;
      }
    );
  }

  addIngredientToShoppingList() {
    this.recipeService.moveIngredientsToShoppingList(
      this.itemSelect.ingredients
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
