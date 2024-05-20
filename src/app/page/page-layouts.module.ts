import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldModule } from '../components/formly-field/formly-field.module';
import { RouterModule } from '@angular/router';
import { contentPagesRoutes } from './page-layouts.routing';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { QuizPageComponent } from './quiz-page/quiz-page.component';
import { SummaryPageComponent } from './summary-page/summary-page.component';

@NgModule({
  declarations: [HomePageComponent, LoginPageComponent, RegisterPageComponent, QuizPageComponent, SummaryPageComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyFieldModule,
    RouterModule.forChild(contentPagesRoutes),
  ],
})
export class PageLayoutsModule {}
