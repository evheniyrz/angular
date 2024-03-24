import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { MemberPageComponent } from './member-page.component';


@NgModule({
    imports: [
        CommonModule,
        MemberRoutingModule,
        MemberPageComponent
    ]
})
export class MemberModule { }
