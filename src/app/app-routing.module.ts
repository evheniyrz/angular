import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberGuard } from './modules/shared-member/guards/member.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'member',
    loadChildren: () => import('./modules/member/member.module').then(m => m.MemberModule),
    canActivate: [MemberGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      anchorScrolling: 'enabled',
      scrollOffset: [0, 70]
    }
  )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
