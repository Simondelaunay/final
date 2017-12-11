import {Component, OnInit, OnDestroy, ViewContainerRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

import * as io from 'socket.io-client';
import {PizzaService} from './shared/services/pizza/pizza.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = `Simon\'s pizzas`;
  connection;

  constructor(public toaster: ToastsManager,
              public vcr: ViewContainerRef,
              private pizzaService: PizzaService) {

    this.toaster.setRootViewContainerRef(vcr);

  }

  ngOnInit() {
    this.connection = this.pizzaService.listenOnToast().subscribe(
      (data: any) => {
        switch (data.type) {
          case 'success':
            console.log('ok');
            this.toaster.success(data.message, data.title);
            break;
          case 'info':
            this.toaster.info(data.message, data.title);
            break;
          case 'warning':
            this.toaster.warning(data.message, data.title);
            break;
          case 'error':
            this.toaster.error(data.message, data.title);
            break;
        }

      }
    );
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }


}
