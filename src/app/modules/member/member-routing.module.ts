import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberPageComponent } from './member-page.component';


const routes: Routes = [
  {
    path: '',
    component: MemberPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
