import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuardService } from '../../auth-guard.service';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { QuizPageComponent } from './quiz-page/quiz-page.component';
import { SummaryPageComponent } from './summary-page/summary-page.component';

export const contentPagesRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent,
    data: {
      title: 'หน้าแรก',
    },
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    data: {
      title: 'ลงทะเบียนตอบคำถาม',
    },
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    component: LoginPageComponent,
    data: {
      title: 'เข้าสู่ระบบ',
    },
    canActivate: [AuthGuardService],
  },
  {
    path: 'quiz',
    component: QuizPageComponent,
    data: {
      title: 'Quiz',
    },
    canActivate: [AuthGuardService],
  },
  {
    path: 'summary',
    component: SummaryPageComponent,
    data: {
      title: 'Summary',
    },
    canActivate: [AuthGuardService],
  },
];
