import { Component, OnInit, Input } from '@angular/core';
import { LoggedUser } from 'src/app/modules/auth/services/user-login-response/user-login-response.model';
import { NgStyle } from '@angular/common';

@Component({
    selector: 'evh-profile-menu',
    templateUrl: './profile-menu.component.html',
    styleUrls: ['./profile-menu.component.scss'],
    standalone: true,
    imports: [NgStyle]
})
export class ProfileMenuComponent implements OnInit {

  @Input() userData: LoggedUser;
  public menuButtonStyleConfig: { [key: string]: string };
  constructor() { }

  ngOnInit() {
    this.menuButtonStyleConfig = {
      background: `#a39a8a url(${this.userData.picture})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'contain',
    };
  }

}
