import {Component, Inject, signal} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {ToasterService} from "./core/services/toaster.service";
import {NgbToast} from "@ng-bootstrap/ng-bootstrap";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgbToast, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(private router: Router, protected toasterService: ToasterService) {
  }
  protected readonly title = signal('ot-sample-verification-tracker-ui');
}
