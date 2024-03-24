import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'evh-auth-page',
    templateUrl: './auth-page.component.html',
    styleUrls: ['./auth-page.component.scss'],
    standalone: true
})
export class AuthPageComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // this.authService.login('/member');
  }

}
