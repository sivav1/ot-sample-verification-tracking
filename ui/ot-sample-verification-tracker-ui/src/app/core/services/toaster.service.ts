// toast.service.ts
import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({ providedIn: 'root' })
export class ToasterService {
  toastsSubject$ = new BehaviorSubject<any>(null);

  showError(message: string) {
    console.log(message, 'toast');
    this.toastsSubject$.next({ message, classname: 'bg-danger text-light', delay: 5000 });
  }

  remove(toast: any) {

  }
}
