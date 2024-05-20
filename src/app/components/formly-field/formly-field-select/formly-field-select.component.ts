import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { SelectorOption } from '../../custom-form-input/custom-select/custom-select.component';

@Component({
  selector: 'app-formly-field-select',
  templateUrl: './formly-field-select.component.html',
  styleUrls: ['./formly-field-select.component.scss'],
})
export class FormlyFieldSelectComponent extends FieldType<FieldTypeConfig> implements OnInit {
  value: string | null = null;
  itemOptions!: SelectorOption[] | Function;
  hideRequired!: boolean;
  required!: boolean;
  placeholder!: string;
  containerClass!: string;
  labelClass!: string;
  inputClass!: string;
  sideInputClass!: string;
  label!: string;
  onChange!: Function;
  optionsAsync!: Observable<SelectorOption[]> | null;
  sideLabel!: boolean;
  searchable!:boolean;

  ngOnInit(): void {
    this.value = this.formControl.value;
    this.itemOptions = this.props['itemOptions'] ?? [];
    this.required = this.props['required'] ?? false;
    this.placeholder = this.props['placeholder'] ?? 'โปรดเลือก';
    this.containerClass = this.props['containerClass'] ?? '';
    this.labelClass = this.props['labelClass'] ?? '';
    this.inputClass = this.props['inputClass'] ?? '';
    this.label = this.props['label'] ?? '';
    this.optionsAsync = this.props['optionsAsync'] ?? null;
    this.hideRequired = this.props['hideRequired'] ?? false;
    this.onChange = this.props['onChange'] ?? function () {};
    this.sideLabel = this.props['sideLabel'] ?? false;
    this.sideInputClass = this.props['sideInputClass'] ?? '';
    this.searchable = this.props['searchable'] ?? false;
  }

  onChangeOption() {
    this.formControl.setValue(this.value);
    this.onChange(this.value);
  }
}
