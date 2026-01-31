import { Routes } from '@angular/router';
import {ListProductSamplesComponent} from './features/list-product-samples.component/list-product-samples.component';
import {AddProductSampleComponent} from './features/add-product-sample.component/add-product-sample.component';
import {MainDiv} from './features/main-div/main-div';

export const routes: Routes = [
  { path: 'add', component: MainDiv },
  { path: 'list', component: MainDiv },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];
