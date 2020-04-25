import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberPageComponent } from './member-page.component';


const routes: Routes = [
  {
    path: '',
    component: MemberPageComponent,
    loadChildren: () => import('./pages/member-pages.module').then(m => m.MemberPagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
