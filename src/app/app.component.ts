import {Component} from '@angular/core';
import {Observable, Subscription, timer} from 'rxjs';
import {from} from 'rxjs';
import {debounce, debounceTime, filter, take} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RxjsLesson';

  constructor() {

    // ========================= Create First Observable ====================================/

    const stream$ = Observable.create((observer) => {
      observer.next(1);
      setTimeout(() => {
        observer.next(1);
      }, 1000);

      setTimeout(() => {
        observer.next(2);
      }, 2000);

      setTimeout(() => {
        observer.error('Error');
      }, 3000);

      setTimeout(() => {
        observer.complete('Complete');
      }, 4000);
    });

    const subscription = stream$.subscribe({
      next: (value: number) => this.renderNext(value),
      error: (error) => this.renderError(error),
      complete: (result) => this.renderComplete()
    });

    // ===================================================================================

    const streamSecond$ = Observable.create((observer) => {
      const interval = setInterval(() => {
        observer.next('Add observer');
      }, 1000);
    });

    const subscriptionSecond = streamSecond$.subscribe((value) => {
      console.log(value);
    });
    // subscriptionSecond.unsubscribe();

    //  =========================== Observable Operators ==========================================


    // FROM OPERATOR
    const streamFour$ = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

    streamFour$
      .pipe(take(10),
        debounceTime(100),
        filter(x => x < 8))
        .subscribe(result => console.log(result)); // Take just 5 element from observable
  }

  renderNext(value) {
    console.log('Print next', value);


  }

  renderError(error) {
    console.log('Print error', error);

  }

  renderComplete() {
    console.log('Print complete');

  }


}
