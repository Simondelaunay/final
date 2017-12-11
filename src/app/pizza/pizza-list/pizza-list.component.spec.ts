import {TestBed, inject} from '@angular/core/testing';
import { PizzaListComponent } from './pizza-list.component';
import { PizzaService } from '../../shared/services/pizza/pizza.service';

describe('Test AppComponent', () => {

  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PizzaListComponent],
      providers: [PizzaService]
    });
    fixture = TestBed.createComponent(PizzaListComponent);
  });

  it('should return +1 on upVote', inject([PizzaService], (pizzaService: PizzaService) => {
    fixture.componentInstance.voteUp();
    fixture.componentInstance.voteUp();
    expect(fixture.componentInstance.vote).toBe(2);
  }));

  it('should return 0 on downVote', () => {
    fixture.componentInstance.voteDown();
    expect(fixture.componentInstance.vote).toBe(0);
  });

});
