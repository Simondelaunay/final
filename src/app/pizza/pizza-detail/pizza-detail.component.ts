import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PizzaService} from '../../shared/services/pizza/pizza.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pizza-detail',
  templateUrl: './pizza-detail.component.html',
  styleUrls: ['./pizza-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PizzaDetailComponent implements OnInit {

  selectedPizza: any;

  constructor(
    private pizzaService: PizzaService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.pizzaService.getById(id).subscribe(data => {
      this.selectedPizza = data;
      console.log(this.selectedPizza);
    });

  }

}
