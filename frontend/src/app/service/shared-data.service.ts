import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  invokedMethod: Subject<any> = new Subject();

  constructor() {
  }

  invokeExternalMethod(action: string, data: any) {
    this.invokedMethod.next({action: action, data: data})
  }

}
