import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicHeaderComponent } from './components/public-header/public-header.component';
import { PublicFooterComponent } from './components/public-footer/public-footer.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [PublicHeaderComponent, PublicFooterComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [PublicHeaderComponent, PublicFooterComponent]
})
export class SharedPublicModule { }
