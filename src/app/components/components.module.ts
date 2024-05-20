import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomSelectComponent } from './custom-form-input/custom-select/custom-select.component';
import { RouterModule } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

const components = [CustomSelectComponent, HeaderComponent, FooterComponent];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FormlyModule,
  ],
  exports: [...components],
})
export class ComponentsModule {}
