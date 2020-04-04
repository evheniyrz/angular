import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './modules/auth/services/auth.service';
import { MemberGuard } from './modules/shared-member/guards/member.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HammerModule,
    AppRoutingModule
  ],
  providers: [AuthService, MemberGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
