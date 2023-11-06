import {
  Component,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { Recipe } from 'src/app/recipes/recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') recipeName!: ElementRef;
  @ViewChild('amountInput') recipeAmount!: ElementRef;
  @Output() userIngredientInput = new EventEmitter<Ingredient>();
  ingredient!: Ingredient;
  addIngredient() {
    this.ingredient = new Ingredient(
      this.recipeName.nativeElement.value,
      this.recipeAmount.nativeElement.value
    );

    this.userIngredientInput.emit(this.ingredient);
  }
}
