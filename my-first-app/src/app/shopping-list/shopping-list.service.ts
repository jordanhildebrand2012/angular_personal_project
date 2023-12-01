import { Subject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class ShoppingListService implements OnInit {
  private ingredients: Ingredient[] = [
    new Ingredient('apple', 5),
    new Ingredient('tomatoes', 10),
    new Ingredient('pasta', 2),
  ];

  ingredientChange = new Subject<Ingredient[]>();
  ingredientItemIdClicked = new Subject<number>();

  ngOnInit(): void {}

  getItemById(id: number): Ingredient {
    return this.ingredients[id];
  }

  getShoppingList(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientChange.next(this.ingredients.slice());
  }

  updateIngredient(ingredientId: number, newIngredient: Ingredient) {
    this.ingredients[ingredientId] = newIngredient;
    this.ingredientChange.next(this.ingredients.slice());
  }

  deleteIngredient(ingredientId: number) {
    this.ingredients.splice(ingredientId, 1);
    this.ingredientChange.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
  }
}
