import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContextService {
  public isLoggedIn$ = new Subject<boolean>();

  public setLogIn(isLoggedIn: boolean) {
    this.isLoggedIn$.next(isLoggedIn);
  }
}
