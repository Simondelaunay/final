import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IngredientService} from '../../shared/services/ingredient/ingredient.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-ingredient-detail',
  templateUrl: './ingredient-detail.component.html',
  styleUrls: ['./ingredient-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IngredientDetailComponent implements OnInit {

  selectedIngredient: any;

  constructor(
    private ingredientService: IngredientService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.ingredientService.getById(id).subscribe(data => {
      this.selectedIngredient = data;
    });

  }

}
