import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/auth/services/auth.service';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'evh-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet]
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.auth.localAuthSetup();
    this.auth.handleAuthCallback();
  }
}
