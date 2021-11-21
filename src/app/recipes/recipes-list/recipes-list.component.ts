import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipes.service';
// import { EventEmitter } from 'events';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
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
    ]),
    trigger('list2', [
      state('in', style({
        opacity: 1,
        transform:'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(150px)'
        }),
        animate(500)
      ]),
    ])
  ],
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  sallad: Recipe[];
  chicken: Recipe[];
  burgers: Recipe[];
  desert: Recipe[];
  subscription: Subscription;


  constructor(private  recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.subscription = this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
          this.sallad = this.recipes.filter(x => x.category == 'Sallad');
          this.chicken = this.recipes.filter(x => x.category == 'Chicken');
          this.burgers = this.recipes.filter(x => x.category == 'Burgers');
          this.desert = this.recipes.filter(x => x.category == 'Desert');
            setInterval(()=>{

            },3000);
        }
      );

    this.recipes = this.recipeService.getRecipes();
    this.sallad = this.recipes.filter(x => x.category == 'Sallad');
    this.chicken = this.recipes.filter(x => x.category == 'Chicken');
    this.burgers = this.recipes.filter(x => x.category == 'Burgers');
    this.desert = this.recipes.filter(x => x.category == 'Desert');
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
