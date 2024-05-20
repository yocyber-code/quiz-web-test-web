import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { CoreService } from '../../../core/core.service';

@Component({
  selector: 'app-formly-quiz',
  templateUrl: './formly-quiz.component.html',
  styleUrl: './formly-quiz.component.scss',
})
export class FormlyQuizComponent extends FieldType<FieldTypeConfig> {
  constructor(private readonly coreService: CoreService) {
    super();
  }

  ngAfterViewInit(): void {
    const value = this.field.formControl.value;
    if (value) {
      this.onChange(value);
    }
  }

  onChange(choice_id: number) {
    const radio = document.getElementById(`radio-${choice_id}`);
    if (radio) {
      radio.click();
    }
    this.field.formControl.setValue(choice_id);
  }
}
