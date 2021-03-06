// ANGULAR
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// INTERFACES
import { Select } from '@interfaces/select.interface';

@Component({
  selector: 'app-search',
  styleUrls: ['./_search.component.scss'],
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  @Input() searchOptions?: Select[];
  @Input() searchText = '';
  @Input() method = 'GET';
  searchForm: FormGroup;
  @Output() searchSubmit = new EventEmitter();

  ngOnInit() {
    this.configForm();
  }

  configForm() {
    this.searchForm = this.formBuilder.group({
      searchType: [this.getSelectedOption(), Validators.required],
      searchText: [this.searchText, Validators.required]
    });
  }

  getSelectedOption() {
    let selectedOption;
    this.searchOptions.forEach(option => {
      if (option.selected) {
        selectedOption = option.value;
      }
    });
    return selectedOption;
  }

  submitForm() {
    this.searchSubmit.emit(this.searchForm.value);
  }
}
