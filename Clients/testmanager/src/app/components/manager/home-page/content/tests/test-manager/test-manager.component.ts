import { Component, OnInit } from '@angular/core';
import { TestManagerService } from '../../../../../../services/tests/manager/test-manager.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TableColorService } from '../../../../../../services/cosmetics/table-color.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-test-manager',
  standalone: true,
  imports: [ReactiveFormsModule, NgStyle],
  templateUrl: './test-manager.component.html',
  styleUrl: './test-manager.component.scss',
})
export class TestManagerComponent implements OnInit {
  constructor(
    private readonly testManagerService: TestManagerService,
    private readonly tableColorService: TableColorService
  ) {}

  ngOnInit(): void {
    this.testManagerService.loadUsersTests();
  }

  testFormGroup = new FormGroup({
    index: new FormControl(''),
    name: new FormControl(''),
  });

  selectTest(index: number): void {
    this.testFormGroup.setValue({
      index: (index + 1).toString(),
      name: this.testManagerService.getUsersTestNames()[index],
    });
    return;
  }

  getUsersTests(): string[] {
    return this.testManagerService.getUsersTestNames();
  }

  getValidColor(index: number): string {
    const selectedIndex = Number(this.testFormGroup.controls.index.value!) - 1;
    return this.tableColorService.getValidColor(index, selectedIndex);
  }

  setHoveredRow(index: number): void {
    this.tableColorService.setHoveredRow(index);
  }
}
