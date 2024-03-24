import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { PublicPagesModule } from './pages/public-pages.module';



@NgModule({
    imports: [
    CommonModule,
    PublicRoutingModule,
    PublicPagesModule,
    PublicComponent
]
})
export class PublicModule { }
