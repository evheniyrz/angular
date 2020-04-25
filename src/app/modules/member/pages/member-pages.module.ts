import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberPagesRoutingModule } from './member-pages-routing.module';
import { WelcomeMemberPageComponent } from './welcome-member-page/welcome-member-page.component';
import { SharedMemberModule } from '../../shared-member/shared-member.module';

@NgModule({
  declarations: [WelcomeMemberPageComponent],
  imports: [
    CommonModule,
    MemberPagesRoutingModule,
    SharedMemberModule
  ]
})
export class MemberPagesModule { }
