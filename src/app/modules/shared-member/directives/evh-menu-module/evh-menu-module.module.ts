import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationMenuDirective } from './animation-menu-directive/evh-menu.directive';
import { MenuTriggerDirective } from './menu-trigger/menu-trigger.directive';



@NgModule({
  declarations: [AnimationMenuDirective, MenuTriggerDirective],
  imports: [
    CommonModule
  ],
  exports: [AnimationMenuDirective, MenuTriggerDirective]
})
export class EvhMenuModuleModule { }
