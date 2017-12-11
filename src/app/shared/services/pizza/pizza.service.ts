import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import * as io from 'socket.io-client';

import { Pizza } from '../../../models/pizza';

@Injectable()
export class PizzaService {

  private baseUrl = 'https://server-simsimz.c9users.io';
  private socket  = io.connect(this.baseUrl);

  private url: string;

  constructor(private http: HttpClient) {
    this.url = this.baseUrl + '/pizzas';
  }

  get(): Observable<any> {
    return this.http.get(this.url);
  }

  getById(id): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  create(pizza: Pizza): Observable<any> {
    return this.http.post(this.url, pizza);
  }

  update(id, pizza: Pizza): Observable<any> {
    return this.http.put(this.url + '/' + id, pizza);
  }

  deleteById(id): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }

  // *** SOCKET *** //
  listenPizzaPost() {
    /* Evenement on add-pizza */
    let observable = new Observable(observer => {
        this.socket.on('[Pizza][post]', (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );
    return observable;
  }

  listenPizzaPut() {
    /* Evenement on add-pizza */
    let observable = new Observable(observer => {
        this.socket.on('[Pizza][put]', (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );
    return observable;
  }

  listenPizzaDelete() {
    /* Evenement on add-pizza */
    let observable = new Observable(observer => {
        this.socket.on('[Pizza][delete]', (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );
    return observable;
  }

  listenOnToast() {
    let observable = new Observable(observer => {
        this.socket.on('[Toast][new]', (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );
    return observable;
  }

  /* *** FIN SOCKET *** */

}
