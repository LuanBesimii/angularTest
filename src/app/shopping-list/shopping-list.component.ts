import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subscription, from } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Recipe } from '../recipes/recipes.model';
import { RecipeService } from '../recipes/recipes.service';
import { identifierModuleUrl } from '@angular/compiler';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  animations: [
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform:'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-150px)'
        }),
        animate(500)
      ]),
      transition('* => void', [
        animate(500, style({
          transform: 'translateX(150px)',
          opacity:0
        }))
      ])
    ])
  ],
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] ;

  recipes: Recipe [] ;
  private subscription: Subscription;
  private sub : Subscription;
  id:number;
  recipe: Recipe ;

  constructor(private slService: ShoppingListService, private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params ['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      );
    this.ingredients = this.slService.getIngredients();
    this.subscription = this.slService.ingredientsChanged
    .subscribe(
      (ingredients: Ingredient[]) =>{
        this.ingredients = ingredients;
      }
    )
  }
  onEditItem(index: number){
    this.slService.startedEdititng.next(index);
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onIngredientOrder(event){
    console.log(event)
  }
}
