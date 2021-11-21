import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthGuard } from './auth/auth-guard.service';
import { YourOrderComponent } from './your-order/your-order.component';

const appRoutes: Routes = [
    { path: '', redirectTo:'/signin', pathMatch: 'full' },
    { path: 'recipes', component: RecipesComponent, children: [
        { path: '', component: RecipeStartComponent },
        { path: 'new', component:RecipeEditComponent, canActivate: [AuthGuard]},
        { path: ':id', component: RecipesDetailComponent },
        { path: ':id/edit', component:RecipeEditComponent, canActivate: [AuthGuard]},
    ] },
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: 'your-order', component: YourOrderComponent },
    { path: 'signup', component: SignupComponent},
    { path: 'signin', component: SigninComponent},

]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}