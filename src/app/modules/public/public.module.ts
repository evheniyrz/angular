import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { PublicPagesModule } from './pages/public-pages.module';
import { SharedPublicModule } from '../shared-public/shared-public.module';


@NgModule({
  declarations: [PublicComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    PublicPagesModule,
    SharedPublicModule
  ]
})
export class PublicModule { }
