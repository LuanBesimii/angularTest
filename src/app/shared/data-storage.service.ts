import { Injectable, Component } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { RecipeService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipes.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService){
        
    }
    storeRecipes() {
        const token = this.authService.getIdToken();  
       return this.http.put('https://ng-recipe-book-7c371.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
    }

    getRecipes() {
       const token = this.authService.getIdToken();  
        this.http.get('https://ng-recipe-book-7c371.firebaseio.com/recipes.json?auth=' + token )
            .subscribe(
                (response: Recipe[] ) => {
                    const recipes: Recipe[] = response;
                    this.recipeService.setRecipes(recipes);
                }
            );
    }
}