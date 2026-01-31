import {Component, input, model} from '@angular/core';
import {FormValueControl} from '@angular/forms/signals';

export interface RadioOption {
  label: string;
  value: number;
}

@Component({
  selector: 'app-enum-radio-group',
  imports: [],
  standalone: true,
  templateUrl: './enum-radio-group.component.html',
  styleUrl: './enum-radio-group.component.css',
})
export class EnumRadioGroupComponent implements FormValueControl<number | null> {
  options = input<RadioOption[]>([]);
  groupName = input<string>('radioGroup');

  readonly value = model<number | null>(null);
  readonly touched = model(false);

  onSelectionChange(val: number) {
    this.value.set(val);
  }
}
