import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

import {IngredientService} from '../../shared/services/ingredient/ingredient.service';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent implements OnInit {

  listIngredient = [];
  result: any;
  connection;

  constructor(public toaster: ToastsManager,
              public vcr: ViewContainerRef,
              private ingredientService: IngredientService) {

    this.toaster.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.ingredientService.get().subscribe(data => {
      this.listIngredient = data;
      console.log(this.listIngredient);
    });


    // SOCKET.IO
    // POST
    this.connection = this.ingredientService.listenIngredientPost().subscribe((ingredient: any) => {
        this.listIngredient.unshift(ingredient);
        this.toaster.success(`Découvrez le nouvel ingredient : ${ingredient.name} !! `, 'Nouvel ingredient !');
      },
      () => this.toaster.error(`Un problème a été rencontré durant la récupération du nouvel ingredient.`, 'Oups !')
    );
    // PUT
    this.connection = this.ingredientService.listenIngredientPut().subscribe((ingredient: any) => {
      // Mise à jour de l'ingrédient
      for (const i in this.listIngredient) {
          if (this.listIngredient[i]._id === ingredient._id) {
            this.listIngredient[i] = ingredient;
          }
        }
        this.toaster.success(`L'ingredient : ${ingredient.name} a été amélioré !! `, 'Amélioration ingredient !');
      },
      () => this.toaster.error(`Un problème a été rencontré durant la récupération de l'ingrédient mis à jour.`, 'Oups !')
    );
    // DELETE
    this.connection = this.ingredientService.listenIngredientDelete().subscribe((ingredient: any) => {
        console.log(this.listIngredient);
        this.listIngredient = this.listIngredient.filter(aIngredient => aIngredient._id !== ingredient._id);
        console.log(this.listIngredient);
        this.toaster.success(`L'ingredient : ${ingredient.name} n'est plus disponible !! `, 'Retrait ingredient !');
      },
      () => this.toaster.error(`Un problème a été rencontré durant la récupération de l'ingredient supprimé.`, 'Oups !')
    );

  }

  deleteIngredient(ingredient) {
    ingredient.deleted = true;

    this.ingredientService.update(ingredient._id, ingredient).subscribe(
      () => {
        this.listIngredient = this.listIngredient.filter(aIngredient => aIngredient._id !== ingredient._id);
        this.toaster.success(`L'ingredient a été supprimé.`, 'Supprimé !');
      },
      () => this.toaster.error(`Un problème a été rencontré durant la suppression de l'ingredient.`, 'Oups !')
    );


  }

}
