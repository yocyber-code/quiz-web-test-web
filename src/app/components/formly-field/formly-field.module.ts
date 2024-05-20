import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { RouterModule } from '@angular/router';
import { IMaskModule } from 'angular-imask';
import { isEmpty } from 'lodash';
import { ComponentsModule } from '../components.module';
import { FormlyFieldInputComponent } from './formly-field-input/formly-field-input.component';
import { FormlyFieldSelectComponent } from './formly-field-select/formly-field-select.component';
import { HammerModule } from '@angular/platform-browser';
function requiredValidationMessage(error: any, field: FormlyFieldConfig | any) {
  return `โปรดระบุ${
    !isEmpty(field.templateOptions.label)
      ? field.templateOptions.label
      : field.templateOptions.placeholder.split('*')[0].trim()
  }`;
}
function minLengthValidationMessage(error: any, field: FormlyFieldConfig | any) {
  return `โปรดระบุข้อมูลไม่น้อยกว่า ${field.templateOptions.minLength} ตัวอักษร`;
}
function maxLengthValidationMessage(error: any, field: FormlyFieldConfig | any) {
  return `โปรดระบุข้อมูลอย่างน้อย ${field.templateOptions.maxLength} ตัวอักษร`;
}
function patternValidationMessage(error: any, field: FormlyFieldConfig | any) {
  return `รูปแบบข้อมูล${
    !isEmpty(field.templateOptions.label)
      ? field.templateOptions.label
      : field.templateOptions.placeholder.split('*')[0].trim()
  }ไม่ถูกต้อง`;
}

const formlyComponents = [
  FormlyFieldInputComponent,
  FormlyFieldSelectComponent,
];

@NgModule({
  declarations: [...formlyComponents],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    IMaskModule,
    HammerModule,
    FormlyModule.forRoot({
      validators: [
        {
          name: 'percentRequire',
          validation: (control: AbstractControl) => {
            if (control?.value?.charAt(0) === '%') {
              return { required: true };
            }
            return null;
          },
        },
        {
          name: 'passwordMatch',
          validation: (control: AbstractControl) => {
            const { password, confirmPassword } = control.value;
            if (confirmPassword === password) return null;
            return { passwordMatch: true };
          },
        },
        {
          name: 'passwordPattern',
          validation: (control: AbstractControl) => {
            const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[$&+,:;=?@#|'<>.^*()%!-]).{8,}$/;
            if (control?.value?.length < 8) return { passwordLength: true };
            if (!regex.test(control?.value)) return { passwordPattern: true };
            return null;
          },
        },
      ],
      validationMessages: [
        { name: 'required', message: requiredValidationMessage },
        { name: 'pattern', message: patternValidationMessage },
        { name: 'minLength', message: minLengthValidationMessage },
        { name: 'maxLength', message: maxLengthValidationMessage },
        {
          name: 'passwordMatch',
          message: 'ยืนยันรหัสผ่านต้องตรงกับรหัสผ่านที่ระบุ',
        },
        {
          name: 'passwordPattern',
          message: 'รหัสผ่านต้องมีตัวอักษรพิมพ์เล็กพิมพ์ใหญ่และตัวอักษรพิเศษ',
        },
        {
          name: 'passwordLength',
          message: 'รหัสผ่านต้องมีความยาวไม่น้อยกว่า8ตัวอักษร',
        },
      ],
      wrappers: [],
      types: [
        {
          name: 'inputField',
          component: FormlyFieldInputComponent,
        },
        {
          name: 'selectField',
          component: FormlyFieldSelectComponent,
        },
      ],
    }),
  ],
  exports: [FormlyModule, ...formlyComponents],
})
export class FormlyFieldModule {}
