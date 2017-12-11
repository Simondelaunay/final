import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Validators, FormControl, FormGroup} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

import {PizzaService} from '../../shared/services/pizza/pizza.service';
import {IngredientService} from '../../shared/services/ingredient/ingredient.service';

import {ActivatedRoute, Router} from '@angular/router';
import {ingredientToArrayIds} from '../../models/pizza';

@Component({
  selector: 'app-pizza-add',
  templateUrl: './pizza-form.component.html',
  styleUrls: ['./pizza-form.component.css']
})
export class PizzaFormComponent implements OnInit {
  isLoading = false;
  result: any;
  actual_form: string;
  title_form: string;

  id_to_update: number;
  selectedPizza: any;

  listIngredient: any;
  selectedIngredients: any;

  base64textString: string;

  private form: FormGroup;

  constructor(public toaster: ToastsManager,
              public vcr: ViewContainerRef,
              private pizzaService: PizzaService,
              private ingredientService: IngredientService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {

    this.toaster.setRootViewContainerRef(vcr);
    this.actual_form = this.activatedRoute.snapshot.url[1].path;
    this.selectedIngredients = [];
  }

  ngOnInit() {

    // ON charge la liste des INGREDIENTS
    this.ingredientService.get().subscribe(
      data => {
        this.listIngredient = data;
      },
      () => {
        this.listIngredient = [];
      }
    );

    // SI ON AJOUTE
    if (this.actual_form === 'add') {

      this.title_form = 'Ajouter';
      this.form = new FormGroup({
        img: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),
        ingredients: new FormControl(this.selectedIngredients)
      });

    } else {

      this.title_form = 'Modifier';
      // On récupère l'objet courant
      this.id_to_update = this.activatedRoute.snapshot.params['id'];
      // ON récupère la pizza
      this.pizzaService.getById(this.id_to_update).subscribe(
        data => {
          this.selectedPizza = data;
          this.selectedIngredients = ingredientToArrayIds(data);
          this.base64textString = this.selectedPizza.img;
          // On initialise le form
          this.form = new FormGroup({
            id_to_update: new FormControl(this.id_to_update, Validators.required),
            img: new FormControl(this.base64textString),
            name: new FormControl(this.selectedPizza.name, Validators.required),
            description: new FormControl(this.selectedPizza.description, Validators.required),
            price: new FormControl(this.selectedPizza.price, Validators.required),
            ingredients: new FormControl(this.selectedIngredients)
          });
        },
        () => {
          // On redirige
          this.router.navigate(['/pizzas']);
        }
      );
    }

  }

  /* *** Evenement onChange Image Pizza *** */
  handleFileSelect(evt) {
    const files = evt.target.files;
    const file = files[0];

    if (files && file) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.form.patchValue({img: this.base64textString});
  }

  onSubmit() {
    this.isLoading = true;
    // SI ON AJOUTE
    if (this.actual_form === 'add') {
      this.form.value.img = this.base64textString;
      this.pizzaService.create(this.form.value).subscribe(
        (pizza) => {
          console.log(pizza);
          this.form.reset();
        },
        () => this.toaster.error(`Un problème est survenu lors de l'ajout de la pizza.`, 'Oups !'),
        () => this.isLoading = false,
      );
    } else {
      // SI ON UPDATE
      this.pizzaService.update(this.id_to_update, this.form.value).subscribe(
        () => {
          this.selectedPizza = this.form.value;
          this.toaster.success('La pizza a été enregistrée.', 'Enregistrée !');
        },
        () => this.toaster.error(`Un problème est survenu lors de a mise à jour de la pizza.`, 'Oups !'),
        () => this.isLoading = false,
      );
    }

  }

  toggleIngredient(id) {
    const index = this.selectedIngredients.indexOf(id);
    if (index !== -1) {
      this.selectedIngredients.splice(index, 1);
    } else {
      this.selectedIngredients.push(id);
    }
    console.log(this.selectedIngredients);
  }

}
