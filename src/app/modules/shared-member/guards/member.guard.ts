import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class MemberGuard  {

  constructor(private auth: AuthService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.auth.isAuthenticated$.pipe(map(data => {
      if (!data) {
        this.auth.login(state.url);
      }
      return data;
    }));
  }

}
