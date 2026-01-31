import {Component, model} from '@angular/core';
import {NgbInputDatepicker} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-signal-datepicker.component',
  imports: [
    NgbInputDatepicker,
    FormsModule
  ],
  templateUrl: './signal-datepicker.component.html',
  styleUrl: './signal-datepicker.component.css',
})
export class AppSignalDatepickerComponent {
  readonly value = model<Date | null>(null);
  readonly touched = model(false);
}
