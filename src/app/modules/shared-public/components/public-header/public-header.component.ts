import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { tap } from 'rxjs/operators';
import { LoggedUser } from 'src/app/modules/auth/services/user-login-response/user-login-response.model';

@Component({
  selector: 'evh-public-header',
  templateUrl: './public-header.component.html',
  styleUrls: ['./public-header.component.scss']
})
export class PublicHeaderComponent implements OnInit {

  public userAuthData: LoggedUser;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.userProfile$.pipe(
      tap((userData: LoggedUser) => {
        this.userAuthData = userData;
      })
    ).subscribe();
  }

  /**
   * login with Auth0
   */
  public login() {
    this.auth.login('/member');
  }

  public logoutUser(): void {
    this.auth.logout();
  }
}
