import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LoggedUser } from '../../auth/services/user-login-response/user-login-response.model';

@Component({
  selector: 'evh-account-member-menu',
  templateUrl: './account-member-menu.component.html',
  styleUrls: ['./account-member-menu.component.scss']
})
export class AccountMemberMenuComponent implements OnInit {

  public profile: LoggedUser;
  public menuButtonStyleConfig: { [key: string]: string };
  private onDestroy$: Subject<boolean> = new Subject();

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.auth.userProfile$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((data: LoggedUser) => {
      this.profile = data;
      this.menuButtonStyleConfig = {
        background: `#a39a8a url(${this.profile.picture})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
      };
    });
  }

  public accountLogout(): void {
    this.auth.logout();
  }

}
