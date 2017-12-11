import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PizzaListComponent } from './pizza-list/pizza-list.component';
import { PizzaFormComponent } from './pizza-form/pizza-form.component';
import { PizzaDetailComponent } from './pizza-detail/pizza-detail.component';
import { PizzaService } from '../shared/services/pizza/pizza.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [PizzaListComponent, PizzaFormComponent, PizzaDetailComponent],
  exports: [
    PizzaListComponent,
  ],
  providers: [
    PizzaService
  ]
})
export class PizzaModule { }
