import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageLayoutsComponent } from './page/page-layouts.component';

export const pageRoute: Routes = [
  {
    path: '',
    loadChildren: () => import('./page/page-layouts.module').then((m) => m.PageLayoutsModule),
  },
];

const routes: Routes = [
  {
    path: '',
    component: PageLayoutsComponent,
    children: pageRoute,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
