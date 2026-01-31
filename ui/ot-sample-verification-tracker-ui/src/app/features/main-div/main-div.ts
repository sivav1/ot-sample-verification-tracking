import { Component } from '@angular/core';
import {AddProductSampleComponent} from '../add-product-sample.component/add-product-sample.component';
import {ListProductSamplesComponent} from '../list-product-samples.component/list-product-samples.component';

@Component({
  selector: 'app-main-div',
  imports: [
    AddProductSampleComponent,
    ListProductSamplesComponent
  ],
  templateUrl: './main-div.html',
  styleUrl: './main-div.css',
})
export class MainDiv {

}
