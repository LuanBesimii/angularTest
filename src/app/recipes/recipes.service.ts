import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Recipe} from './recipes.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Order } from '../shared/order.model';
import { __values } from 'tslib';
import { Router } from '@angular/router';

@Injectable()
export class RecipeService{

    recipesChanged = new Subject<Recipe[]>();
    onAddYourOrder = new BehaviorSubject<Recipe []>([]);
    startedEdititng = new Subject<number>();
    shortInstruction: string;


    private recipes: Recipe[] = [
        new Recipe(
        0,
        'Shopska Salad',
        'Is the most used salad in every restaurant in our place',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Chopska.jpg/1280px-Chopska.jpg',
        'Sallad',
        [
          new Ingredient('Tomato', 1),
          new Ingredient('Cucumbers', 2),
          new Ingredient('Onions', 1),
          new Ingredient('Cheese', 4),
        ],
          '00:10',
          '1. Place chopped tomatoes, cucumbers, onions, and peppers in a large serving bowl' +
          '2. Add salt, oil, and vinegar to the tomato mixture; toss and mix until well blended. Taste for seasoning and adjust accordingly.' +
          '3. Top with crumbled feta cheese and sprinkle with fresh chopped parsley.' +
          '4. Serve.',
          'https://diethood.com/shopska-salad-macedonian-chopped-salad/'
        ),
        new Recipe(
        1,
          'TUNA SALAD',
        'Tuna salad is a light and fresh comfort food classic',
        'https://img.taste.com.au/xg3XMRpy/taste/2016/11/mediterranean-tuna-salad-31059-1.jpeg',
        'Sallad',
        [
          new Ingredient('Tuna', 3),
          new Ingredient('Mayo', 1),
          new Ingredient('Mustard', 1),
          new Ingredient('Celery', 1),
          new Ingredient('Parsley', 1),
          new Ingredient('Onion', 2),
          new Ingredient('Lettuce', 1),
        ],
          '00:15',
          '1.Drain the liquid from the tuna cans. Then, add the tuna, mayonnaise, diced celery, diced red onion, herbs, Dijon mustard, salt and pepper to a mixing bow' +
          'Stir all of the ingredients together until well combined' +
          'Enjoy the tuna salad plain out of a bowl, wrapped up in lettuce, or in a sandwich',
          'https://downshiftology.com/recipes/tuna-salad/'),

        new Recipe(
        2,
        'GRILLED CHICKEN CLUB',
        'this burger is made with grilled chicken beef',
        'https://images-gmi-pmc.edge-generalmills.com/79d59251-b0f4-467c-8f2d-5e1c7711d889.jpg',
        'Chicken',
        [
          new Ingredient('Grilled Chicken', 2),
          new Ingredient('kaiser rolls', 2),
          new Ingredient('Bacon slices', 4),
          new Ingredient('Mayo', 3),
          new Ingredient('Lettuce Leaves', 4),
          new Ingredient('Tomato Slice', 2),
        ],
          '00:20',
          'Heat gas or charcoal grill. To flatten each chicken breast, place between 2 sheets of plastic wrap or waxed paper. Working from center, gently pound chicken with flat side of meat mallet or rolling pin until about 1/4 inch thick; remove wrap.' +
          'When grill is heated, carefully oil grill rack. Place chicken on gas grill over medium heat or on charcoal grill over medium coals; cover grill. Cook 6 to 8 minutes, turning once, until chicken is no longer pink in center. During last 5 minutes of cooking time, heat bacon on grill, turning once, until hot. If desired, during last 3 minutes of cooking time, toast kaiser roll pieces, cut side down, on grill.\n' +
          '3' +
          '3\n' +
          'Spread cut sides of roll pieces with mayonnaise. Cut each chicken breast into 2 pieces. For each sandwich, on bottom section of roll, place 2 chicken pieces, overlapping if necessary. Top with lettuce leaf, tomato slice and middle section of roll. Place 2 Canadian bacon slices on top of middle roll section. Top with lettuce leaf and top section of roll. Press each sandwich slightly; spear each with 2 long toothpicks. Cut sandwiches in half between toothpicks.',
          'https://www.bettycrocker.com/recipes/grilled-chicken-club-sandwiches/4563fa87-7754-4d1c-938c-cf6e453c52bf'),
        new Recipe(
        3,
        ' CHEESEBURGER',
        'The classic and most loved burger',
        'https://images.immediate.co.uk/production/volatile/sites/2/2020/04/Cheesburger-01e0a43.jpg?webp=true&quality=90&resize=940%2C399',
        'Burgers',
        [
          new Ingredient('Burger Buns', 1),
          new Ingredient('Beef', 1),
          new Ingredient('Mayo', 2),
          new Ingredient('Ketchup', 1),
          new Ingredient('Cheese Slices', 1),
        ],'00:30',
          '1.To make the sauce, combine all the ingredients in a bowl with a little seasoning.' +
          '2.Heat a large non-stick frying pan over a medium heat and brush the cut sides of the buns liberally with melted butter. Toast in the hot pan until really golden and toasted.' +
          '3.Turn the heat to high. When the pan is really hot, season the mince and form into four balls, then push two into the frying pan, squashing to flatten. Sprinkle over some salt again and cook for 2 minutes until really crisp, then flip, sprinkle over some salt and repeat. Lay a sheet of cheese onto each and cover with a lid for 30 seconds until melted. Move onto a plate and repeat with the remaining patties and cheese slices' +
          '4.Spread some of the sauce onto the bases of the buns, then top with the cheese patties. Top with lots of pickles, then spread the tops liberally with the sauce and put on top to serve.',
          'https://www.olivemagazine.com/recipes/meat-and-poultry/perfect-cheeseburger/'
        ),
        new Recipe(
        4,
        'Mug Cake ',
        'The fastest and most delicious home cake',
        'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/mug-cake-a012dbb.jpg?quality=90&webp=true&resize=300,272',
        'Desert',
        [
          new Ingredient('Flour', 2),
          new Ingredient('Sugar', 3),
          new Ingredient('Cocoa', 4),
          new Ingredient('Egg', 1),
          new Ingredient('Milk', 1),
        ],'00:07','1.Add 4 tbsp self-raising flour, 4 tbsp caster sugar and 2 tbsp cocoa powder to the largest mug you have (to stop it overflowing in the microwave) and mix.\n' +
          'STEP 2\n' +
          'Add 1 medium egg and mix in as much as you can, but don\'t worry if there\'s still dry mix left.\n' +
          'STEP 3\n' +
          'Add the 3 tbsp milk, 3 tbsp vegetable or sunflower oil and a few drops of vanilla essence and mix until smooth, before adding 2 tbsp chocolate chips, nuts, or raisins, if using, and mix again.\n' +
          'STEP 4\n' +
          'Centre your mug in the middle of the microwave oven and cook on High for 1½ -2 mins, or until it has stopped rising and is firm to the touch.','https://www.bbcgoodfood.com/recipes/microwave-mug-cake'),
      ];

      constructor(private slService: ShoppingListService, private router: Router)
      {

      }

      setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }

      getRecipes(){
          return this.recipes.slice();

      }

      getRecipe(id: number){
          return this.recipes.find(x => x.id == id);
      }

      addIngredientsToShoppingList(ingredients: Ingredient[] ) {
         this.slService.addIngredientss(ingredients);

      }

      addOrder(order: Order ){
        this.slService.addOrder(order);
        this.onAddYourOrder.next(this.recipes.slice());
      }

      addRecipe(recipe: Recipe){
        recipe.id = parseInt(this.recipes[this.recipes.length -1].id.toString()) +1;
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());

      }



      updateRecipe(index: number, newRecipe: Recipe) {
        var id =  this.recipes.findIndex(x => x.id == index);
        var recipe = new Recipe(Number(newRecipe.id), newRecipe.name, newRecipe.description, newRecipe.imagePath, newRecipe.category, newRecipe.ingredients);
        this.recipes[id] = recipe;
        this.recipesChanged.next(this.recipes);
        }

      deleteRecipe(index: number){
       this.recipes =  this.recipes.filter(x => x.id !== index);
        console.log('test');
        console.log(this.recipes);
        console.log(index);
        this.recipesChanged.next(this.recipes);
      }



      addYourOrder(order){
        this.onAddYourOrder.next(order);
      }
      updateYourOrder(index: number, newRecipe: Recipe){
        var id =  this.recipes.findIndex(x => x.id == index);
        var recipe = new Recipe(Number(newRecipe.id), newRecipe.name, newRecipe.description, newRecipe.imagePath, newRecipe.category, newRecipe.ingredients);
        this.recipes[id] = recipe;
        this.recipesChanged.next(this.recipes);
      }

      onDelete(index :number){
        this.recipes =  this.recipes.filter(x => x.id !== index);
      }
}
