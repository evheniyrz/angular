import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { MemberPageComponent } from './member-page.component';
import { SharedMemberModule } from '../shared-member/shared-member.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MemberPageComponent],
  imports: [
    CommonModule,
    RouterModule,
    MemberRoutingModule,
    SharedMemberModule
  ]
})
export class MemberModule { }
