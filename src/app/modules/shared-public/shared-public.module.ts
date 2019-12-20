import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicHeaderComponent } from './components/public-header/public-header.component';
import { PublicFooterComponent } from './components/public-footer/public-footer.component';



@NgModule({
  declarations: [PublicHeaderComponent, PublicFooterComponent],
  imports: [
    CommonModule
  ],
  exports: [PublicHeaderComponent, PublicFooterComponent]
})
export class SharedPublicModule { }
