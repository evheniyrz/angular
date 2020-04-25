import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { AccountMemberMenuComponent } from './account-member-menu/account-member-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EvhMenuModuleModule } from './directives/evh-menu-module/evh-menu-module.module';

@NgModule({
  declarations: [AccountMemberMenuComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    EvhMenuModuleModule
  ],
  exports: [
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    AccountMemberMenuComponent,
    MatMenuModule,
    MatTooltipModule,
    EvhMenuModuleModule
  ]
})
export class SharedMemberModule { }
