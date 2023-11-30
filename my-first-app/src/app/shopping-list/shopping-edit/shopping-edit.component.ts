import {
  Component,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { Recipe } from 'src/app/recipes/recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent {
  ingredient!: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  addIngredient(form: NgForm) {
    const formValue = form.value;
    this.ingredient = new Ingredient(formValue.name, formValue.amount);

    this.shoppingListService.addIngredient(this.ingredient);
  }
}
