import {Component, OnInit, OnDestroy, ViewContainerRef} from '@angular/core';

import {PizzaService} from '../../shared/services/pizza/pizza.service';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css']
})
export class PizzaListComponent implements OnInit, OnDestroy {

  listPizza = [];
  result: any;
  connection;

  constructor(private pizzaService: PizzaService,
              public toaster: ToastsManager,
              vcr: ViewContainerRef) {
    this.toaster.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    // Récupération des Pizzas
    this.pizzaService.get().subscribe(data => {
      this.listPizza = data;
    });

    // SOCKET.IO
    // POST
    this.connection = this.pizzaService.listenPizzaPost().subscribe((pizza: any) => {
        this.listPizza.unshift(pizza);
        this.toaster.success(`Découvrez la nouvelle Pizza : ${pizza.name} !! `, 'Nouvelle pizza !');
      },
      () => this.toaster.error(`Un problème a été rencontré durant la récupération de la nouvelle pizza.`, 'Oups !')
    );
    // PUT
    this.connection = this.pizzaService.listenPizzaPut().subscribe((pizza: any) => {
        // Mise à jour de l'ingrédient
        for (const i in this.listPizza) {
          if (this.listPizza[i]._id === pizza._id) {
            this.listPizza[i] = pizza;
          }
        }
        this.toaster.success(`La Pizza : ${pizza.name} a été améliorée !! `, 'Amélioration pizza !');
      },
      () => this.toaster.error(`Un problème a été rencontré durant la récupération de la pizza mise à jour.`, 'Oups !')
    );
    // DELETE
    this.connection = this.pizzaService.listenPizzaDelete().subscribe((pizza: any) => {
        this.listPizza = this.listPizza.filter(aPizza => aPizza._id !== pizza._id);
        this.toaster.success(`La Pizza : ${pizza.name} n'est plus disponible !! `, 'Retrait pizza !');
      },
      () => this.toaster.error(`Un problème a été rencontré durant la récupération de la pizza supprimée.`, 'Oups !')
    );

  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  deletePizza(id) {
    this.pizzaService.deleteById(id).subscribe(
      () => {
        this.listPizza = this.listPizza.filter(aPizza => aPizza._id !== id);
        this.toaster.success('La pizza a été supprimée.', 'Supprimée !');
      },
      () => this.toaster.error(`Un problème a été rencontré durant la suppression de la pizza.`, 'Oups !')
    );

  }

}
