import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { IngredientFormComponent } from './ingredient-form/ingredient-form.component';
import { IngredientDetailComponent } from './ingredient-detail/ingredient-detail.component';
import { IngredientService } from '../shared/services/ingredient/ingredient.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [IngredientListComponent, IngredientFormComponent, IngredientDetailComponent],
  exports: [
    IngredientListComponent,
  ],
  providers: [
    IngredientService
  ]
})
export class IngredientModule { }
