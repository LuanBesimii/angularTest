import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipes.service';
import { Recipe } from '../recipes.model';
import { Ingredient } from '../../shared/ingredient.model';

import Swal from 'sweetalert2';
import {ShoppingListService} from "../../shopping-list/shopping-list.service";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
  animations: [
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform:'translateY(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(250px)'
        }),
        animate(500)
      ]),
    ]),
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
      transition('* => void', [
        animate(500, style({
          transform: 'translateX(250px)',
          opacity:0
        }))
      ])
    ]),
    trigger('list3', [
      state('in', style({
        opacity: 1,
        transform:'translateX(0)'
      })),
      transition('* => void', [
        animate(500, style({
          transform: 'translateX(-250px)',
          opacity:0
        }))
      ])
    ]),
  ]
})
export class RecipeEditComponent implements OnInit {

  @Input() testinput: Ingredient;
  recipe: Recipe ;
  recipes: Recipe[]=[];
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  ingredients: Ingredient[];
  form:any;
  post: '';
  parentPost: any[]= [];
  interpretations: [];
  order: any = {};

  constructor(private route: ActivatedRoute ,
    private recipeService: RecipeService,
    public shoppingListService: ShoppingListService,
    private router: Router,)
    {
      this.form = new FormGroup({
        name: new FormControl("",Validators.required),
        imagePath: new FormControl("",Validators.required),
        sourcePath: new FormControl("",Validators.required),
        prepTime: new FormControl("",Validators.required),
        prepInstruction: new FormControl("",Validators.required),
        description: new FormControl("",Validators.required),
        category: new FormControl("",Validators.required),
        ingredients: new FormControl("",Validators.required)
      })
    }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id =+ params['id'];
          this.editMode = params ['id'] != null;
          this.initForm();
        }
      );
      this.recipeForm;
      console.log(this.recipeForm.get('ingredients'))
  }

  onSubmit(){
    let timerInterval
    Swal.fire({
      title: 'Saving Data!',
      html: 'It will close in <b></b> milliseconds.',
      timer: 2000,
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          const content = Swal.getContent()
          if (content) {
            const b = content.querySelector('b')
            if (b) {
              // b.textContent = Swal.getTimerLeft()
            }
          }
        }, 100)
      },
      onClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);

    }
    else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required ),
        'amount': new FormControl(null , [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
      })
    )
    console.log(this.recipeForm.get('ingredients').value)
  }

  onDeleteIngredient(index: number)
  {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

 formData() { return this.recipeForm.get('ingredients'); }

  private initForm() {
    let recipeID = '';
    let recipeName = '';
    let recipeImagePath = '';
    let sourcePath = '';
    let prepTime = '';
    let prepInstruction = '';
    let recipeDescription = '';
    let recipeCategory = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeID = recipe.id.toString();
      recipeName = recipe.name;
      console.log(recipe);
      recipeImagePath = recipe.imagePath;
      sourcePath = recipe.sourcePath;
      prepTime = recipe.prepTime;
      prepInstruction = recipe.prepInstruction;
      recipeCategory = recipe.category;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'id' : new FormControl(recipeID),
      'name' : new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'sourcePath': new FormControl(sourcePath, Validators.required),
      'prepTime': new FormControl(prepTime, Validators.required),
      'prepInstruction': new FormControl(prepInstruction, Validators.required),
      'description' : new FormControl(recipeDescription, Validators.required),
      'category' : new FormControl(recipeCategory, Validators.required),
      'ingredients' : recipeIngredients,
    });
  }

  onAddOrder(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your Order Has Been Added',
      showConfirmButton: false,
      timer: 2000
    })
    let data: any = this.recipeForm.value;

    this.recipeService.addYourOrder(data);
    this.order = Object.assign(this.order, this.recipeForm.value);
    this.addorder(this.order);

  }
  onAddShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
 }

 addorder(order){
   let orders = [];
   if(localStorage.getItem('Order')) {
     orders = JSON.parse(localStorage.getItem('Order'));
     orders = [order, ...orders]
   } else{
     orders = [order];
   }
  localStorage.setItem('Order',JSON.stringify(orders));
  console.log(orders);
 }
  displayFn(ingredientName): string {
    return ingredientName ? ingredientName : '';
  }
}
