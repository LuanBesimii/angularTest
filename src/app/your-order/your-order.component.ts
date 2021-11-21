import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subscription} from 'rxjs';
import { Recipe } from '../recipes/recipes.model';
import { RecipeService } from '../recipes/recipes.service';
import { FormGroup} from '@angular/forms';
import { Order } from '../shared/order.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-your-order',
  templateUrl: './your-order.component.html',
  styleUrls: ['./your-order.component.css']
})
export class YourOrderComponent implements OnInit, OnDestroy {
  @Input() childPosts: any[]=[];
  id: number;
  data;
  ingredients: Ingredient[] ;
  recipe: Recipe;
  recipes: Recipe [];
  editMode = false;
  recipeForm: FormGroup;
  order: Order[];

  public subscription: Subscription;
  constructor(private router: Router, private route: ActivatedRoute, private slService: ShoppingListService ,private recipeService: RecipeService) { }

  ngOnInit(): void {
    if(localStorage.getItem('Order') !== "undefined"){
      this.data = JSON.parse(localStorage.getItem('Order'));
    }
      }
  ngOnDestroy(){
  }
onDelete(i){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
      this.data.splice(i, 1);
    localStorage.setItem('Order', JSON.stringify(this.data));
      Swal.fire(
        'Deleted!',
        'Your order has been deleted.',
        'success'
      )
    }
  })
}
  onSubmit(){
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }
    else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }
  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
