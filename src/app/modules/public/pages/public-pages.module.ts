import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicPagesRoutingModule } from './public-pages-routing.module';
import { PublicHomePageComponent } from './public-home-page/public-home-page.component';


@NgModule({
  declarations: [PublicHomePageComponent],
  imports: [
    CommonModule,
    PublicPagesRoutingModule
  ]
})
export class PublicPagesModule { }
