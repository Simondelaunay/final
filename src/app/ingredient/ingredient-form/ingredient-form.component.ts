import {Component, OnInit} from '@angular/core';
import {Validators, FormControl, FormGroup} from '@angular/forms';
import {IngredientService} from '../../shared/services/ingredient/ingredient.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-ingredient-add',
  templateUrl: './ingredient-form.component.html',
  styleUrls: ['./ingredient-form.component.css']
})
export class IngredientFormComponent implements OnInit {
  result: any;
  actual_form: string;
  id_to_update: number;
  selectedPizza: any;
  title_form: string;

  private form: FormGroup;

  constructor(private ingredientService: IngredientService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {

    this.actual_form = this.activatedRoute.snapshot.url[1].path;
  }

  ngOnInit() {

    // SI ON AJOUTE
    if (this.actual_form === 'add') {
      this.title_form = 'Ajouter';
      this.form = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),
        weight: new FormControl('', Validators.required)
      });
    } else {
      this.title_form = 'Modifier';
      // On récupère l'objet courant
      this.id_to_update = this.activatedRoute.snapshot.params['id'];
      this.ingredientService.getById(this.id_to_update).subscribe(
        data => {
          this.selectedPizza = data;

          // On initialise le form
          this.form = new FormGroup({
            id_to_update: new FormControl(this.id_to_update, Validators.required),
            name: new FormControl(this.selectedPizza.name, Validators.required),
            description: new FormControl(this.selectedPizza.description, Validators.required),
            price: new FormControl(this.selectedPizza.price, Validators.required),
            weight: new FormControl(this.selectedPizza.weight, Validators.required)
          });
        },
        () => {
          // On redirige
          this.router.navigate(['/pizzas']);
        }
      );
    }
  }

  onSubmit() {
    // SI ON AJOUTE
    if (this.actual_form === 'add') {
      this.ingredientService.create(this.form.value).subscribe(
        () => this.result = {
          success: true,
          message: `L'ingredient a été enregistrée.`
        },
        () => this.result = {
          success: false,
          message: `Un problème a été rencontré durant l'enregistrement de l'ingredient.`
        }
      );
    } else {
      // SI ON UPDATE
      this.ingredientService.update(this.id_to_update, this.form.value).subscribe(
        () => this.result = {
          success: true,
          message: `L'ingredient a été enregistrée.`
        },
        () => this.result = {
          success: false,
          message: `Un problème a été rencontré durant l'enregistrement de l'ingredient.`
        }
      );
    }

  }

}
