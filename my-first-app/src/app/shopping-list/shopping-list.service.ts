import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class ShoppingListService implements OnInit {
  private ingredients: Ingredient[] = [
    new Ingredient('apple', 5),
    new Ingredient('tomatoes', 10),
    new Ingredient('pasta', 2),
  ];

  ingredientChange = new EventEmitter<Ingredient[]>();

  ngOnInit(): void {}

  getShoppingList(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientChange.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
  }
}
