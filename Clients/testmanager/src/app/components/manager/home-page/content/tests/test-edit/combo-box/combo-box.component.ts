import { NgFor } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-combo-box',
  standalone: true,
  imports: [NgFor],
  templateUrl: './combo-box.component.html',
  styleUrl: './combo-box.component.scss',
})
export class ComboBoxComponent {
  @Input({ required: true }) options!: string[];
  @Input() selectedOptions: string[] = [];
  dropdownVisible: boolean = false;

  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
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
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;
    if (target && !target.closest('.combobox')) {
      this.dropdownVisible = false;
    }
  }
}
