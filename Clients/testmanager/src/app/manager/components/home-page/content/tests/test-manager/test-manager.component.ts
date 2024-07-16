import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common';
import { Router } from '@angular/router';
import { TableColorService } from '../../../../../services/cosmetics/table-color.service';
import { TestManagerService } from '../../../../../services/tests/manager/test-manager.service';

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
    private readonly tableColorService: TableColorService,
    private readonly router: Router
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

  addNewTest(): void {
    var tests = this.testManagerService.getUsersTestNames();

    this.testFormGroup.setValue({
      index: (tests.length + 1).toString(),
      name: 'Test ' + (tests.length + 1).toString(),
    });
  }

  saveSelectedTest(): void {
    var testName = this.testFormGroup.controls.name.value!;
    var index = Number(this.testFormGroup.controls.index.value!);

    var testNames = this.testManagerService.getUsersTestNames();

    if (testNames!.length < index) {
      this.testManagerService.createNewTestAndLoadTests(testName);
    } else {
      this.testManagerService.updateTestNameAndLoadTests(
        testNames[index - 1],
        testName
      );
    }
  }

  removeSelectedTest(): void {
    var index = Number(this.testFormGroup.controls.index.value!) - 1;
    this.testManagerService.removeTestAndLoadTests(index);
    this.testFormGroup.reset();
  }

  isAnyTestSelected(): boolean {
    return this.testFormGroup.controls.index.value != '';
  }

  goToTestEditor(): void {
    var usersTests = this.testManagerService.getUsersTestNames();
    var selectedIndex = Number(this.testFormGroup.controls.index.value!);

    if (usersTests.length < selectedIndex) {
      return;
    }

    this.testManagerService.selectTestName(usersTests[selectedIndex - 1]);
    this.router.navigateByUrl('home/tests/edit');
  }
}
