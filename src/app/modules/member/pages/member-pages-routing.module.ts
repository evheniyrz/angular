import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeMemberPageComponent } from './welcome-member-page/welcome-member-page.component';


const routes: Routes = [
  {
    path: '',
    component: WelcomeMemberPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberPagesRoutingModule { }
