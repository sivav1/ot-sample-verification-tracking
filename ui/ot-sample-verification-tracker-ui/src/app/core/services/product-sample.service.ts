import { Injectable } from '@angular/core';
import {BehaviorSubject, shareReplay, switchMap} from 'rxjs';
import {ProductSampleModel} from '../models/product-sample.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductSampleService {
  private endpoint = 'SampleVerificationEntry'
  private refreshSubject = new BehaviorSubject<void>(undefined);

  
  constructor(private http: HttpClient) { }

  samples$ = this.refreshSubject.pipe(
    switchMap(() => this.http.get<ProductSampleModel[]>(this.endpoint)),
    shareReplay(1)
  );

  refreshData() {
    this.refreshSubject.next();
  }

  save(sample: ProductSampleModel) {
    const payload = {
      ...sample,
      submittedOn: sample.submittedOn?.toISOString(),
    }
    console.log(JSON.stringify(payload));
    return this.http.post<boolean>(this.endpoint, payload);
  }
}
