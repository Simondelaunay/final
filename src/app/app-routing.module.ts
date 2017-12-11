import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PizzaListComponent} from './pizza/pizza-list/pizza-list.component';
import {PizzaDetailComponent} from './pizza/pizza-detail/pizza-detail.component';
import {PizzaFormComponent} from './pizza/pizza-form/pizza-form.component';

import {IngredientListComponent} from './ingredient/ingredient-list/ingredient-list.component';
import {IngredientDetailComponent} from './ingredient/ingredient-detail/ingredient-detail.component';
import {IngredientFormComponent} from './ingredient/ingredient-form/ingredient-form.component';

const appRoutes: Routes = [
  {path: '', component: PizzaListComponent},
  {path: 'pizzas', component: PizzaListComponent},
  {path: 'pizzas/add', component: PizzaFormComponent},
  {path: 'pizzas/update/:id', component: PizzaFormComponent},
  {path: 'pizzas/:id', component: PizzaDetailComponent},

  {path: 'ingredients', component: IngredientListComponent},
  {path: 'ingredients/add', component: IngredientFormComponent},
  {path: 'ingredients/update/:id', component: IngredientFormComponent},
  {path: 'ingredients/:id', component: IngredientDetailComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,
      {enableTracing: false} // <-- debugging purposes only
    )
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
