import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomSelectComponent } from './custom-form-input/custom-select/custom-select.component';
import { RouterModule } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';

const components = [
  CustomSelectComponent,
];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, FormlyModule],
  exports: [...components],
})
export class ComponentsModule {}
