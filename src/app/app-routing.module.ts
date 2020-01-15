import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', loadChildren: () => import('./modules/public/public.module').then(m => m.PublicModule) }];

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
