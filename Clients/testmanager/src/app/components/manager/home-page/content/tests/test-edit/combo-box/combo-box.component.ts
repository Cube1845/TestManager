import { NgFor } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { TestEditService } from '../../../../../../../services/tests/edit/test-edit.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-combo-box',
  standalone: true,
  imports: [NgFor],
  templateUrl: './combo-box.component.html',
  styleUrl: './combo-box.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboBoxComponent),
      multi: true,
    },
  ],
})
export class ComboBoxComponent implements ControlValueAccessor {
  private onChange!: (value: any) => void;

  constructor(private readonly testEditService: TestEditService) {}

  @Input({ required: true }) options!: string[];
  selectedOptions: string[] = [];
  dropdownVisible: boolean = false;

  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  updateCheckboxes(): void {
    this.options.forEach((option) => {
      const checkbox = document.getElementById(option) as HTMLInputElement;

      if (checkbox) {
        checkbox.checked = this.selectedOptions.includes(option);
      }
    });
  }

  onCheckboxChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      this.selectedOptions.push(checkbox.value);
    } else {
      this.selectedOptions = this.selectedOptions.filter(
        (option) => option !== checkbox.value
      );
    }

    this.onChange(this.selectedOptions);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;
    if (target && !target.closest('.combobox')) {
      this.dropdownVisible = false;
    }
  }

  writeValue(obj: any): void {
    this.selectedOptions = obj;
    this.updateCheckboxes();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}
