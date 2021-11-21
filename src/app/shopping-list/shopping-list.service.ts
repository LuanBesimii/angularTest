import {Ingredient} from '../shared/ingredient.model';

import { Subject } from 'rxjs';
import { Order } from '../shared/order.model';
import { Recipe } from '../recipes/recipes.model';

export class ShoppingListService{
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEdititng = new Subject<number>();
    private ingredients: Ingredient[] = [
      {name:'Oil',amount:1},
      {name:'Milk',amount:1},
      {name:'Eggs',amount:1},
      {name:'Tomatoes',amount:1},
      {name:'Peppers',amount:1},
      {name:'Cheese',amount:1},
      {name:'Potatoes',amount:1},
      {name:'Sugar',amount:1},
      {name:'Salt',amount:1},
      {name:'Garlic',amount:1},
      {name:'Onion',amount:1},
    ];
   private order: Order[];

    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredient(index: number){
        return this.ingredients[index];
    }

    addIngredients(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    addIngredientss(ingredients: Ingredient[])
    {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice())
    }


    addOrder(order: Order ){
        this.order.push(order);
        this.ingredientsChanged.next(this.ingredients.slice())
    }

    updateIngredient(index: number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient (index: number){
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

}
