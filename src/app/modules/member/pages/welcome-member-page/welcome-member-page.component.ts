import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'evh-welcome-member-page',
  templateUrl: './welcome-member-page.component.html',
  styleUrls: ['./welcome-member-page.component.scss']
})
export class WelcomeMemberPageComponent implements OnInit {

  public isMenuOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  public menuOPen(trigger: boolean) {
    this.isMenuOpen = trigger;
  }
}
