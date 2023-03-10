import { Actions, createEffect, ofType} from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, switchMap} from 'rxjs/operators';

import { GET_TRANSATIONS, GetTransactions, GetTransactionsSuccess, GET_TRANSATIONS_SUCCESS } from '../actions/cash.action';
import { of } from 'rxjs';
import { ITransaction } from 'src/app/models/Transaction.model';
import { DataService } from 'src/app/services/data.service';

@Injectable()
export class TransactionEffects {

  constructor(private actions$: Actions, public service: DataService) {}
  getTransactions = this.actions$.pipe(ofType<GetTransactions>(GET_TRANSATIONS),
  map((action: GetTransactions) => action.payload),
  switchMap(payload =>
    this.service.connect().pipe(
      map(
        result =>
          new GetTransactionsSuccess(result)
      )
    )));

    getTransactions$ = createEffect(() => this.getTransactions, {  });
}
