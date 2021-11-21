import { Component, OnInit, } from '@angular/core';
import { Recipe } from '../recipes.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { RecipeService } from '../recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css'],
  animations: [
    trigger('list2', [
      state('in', style({
        opacity: 1,
        transform:'translateY(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-250px)'
        }),
        animate(500)
      ]),
    ]),
  ]
})
export class RecipesDetailComponent implements OnInit {
  recipe: Recipe ;
  id: number;
  ingredientName: string[] = [];
  ingredientAmount:number[] = [];
  newIngredients = {};
  showIngredients: string;

  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router)
   { }

  ngOnInit(separator?: string) {
    // const id = this.route.snapshot.params['id'];
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params ['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      );
    this.getIngredients();
    for (let i = 0; i < this.ingredientName.length; i++){
      this.newIngredients[this.ingredientAmount[i]] = this.ingredientName[i];
    }
    this.showIngredients = this.ingredientName.join(",");
  }

  getIngredients(){
    for (let values of Object.values(this.recipe.ingredients)){
      this.ingredientName.push(values['name']);
      this.ingredientAmount.push(values['amount']);
    }
  }

  onAddShoppingList(){
     this.recipeService.addIngredientsToShoppingList( this.recipe.ingredients);
     Swal.fire({
      title: 'Nice!',
      text: 'Your Ingredients Added',
      icon: 'success',
      confirmButtonText: 'Cool',
      width: '512px',
    })
  }
  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
  onDeleteRecipe(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {

      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
          this.recipeService.deleteRecipe(this.id);
          this.router.navigate(['/recipes']);
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })


  }

}
