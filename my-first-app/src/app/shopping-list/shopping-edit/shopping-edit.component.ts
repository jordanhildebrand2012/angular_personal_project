import {
  Component,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Recipe } from 'src/app/recipes/recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingListForm!: NgForm;
  subscription!: Subscription;
  editMode: boolean = false;
  clickedItemId!: number;
  clickedItem!: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription =
      this.shoppingListService.ingredientItemIdClicked.subscribe(
        (id: number) => {
          this.editMode = true;
          this.clickedItemId = id;
          this.clickedItem = this.shoppingListService.getItemById(id);
          this.shoppingListForm.setValue({
            name: this.clickedItem.name,
            amount: this.clickedItem.amount,
          });
        }
      );
  }

  addIngredient(form: NgForm) {
    const formValue = form.value;
    const ingredient = new Ingredient(formValue.name, formValue.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.clickedItemId, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
