import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'evh-member-page',
  templateUrl: './member-page.component.html',
  styleUrls: ['./member-page.component.scss']
})
export class MemberPageComponent implements OnInit, OnDestroy {

  public opened = false;
  private onDestroy$: Subject<boolean> = new Subject();

  @ViewChild('memberSidenav') private memberSidenav: MatSidenav;
  constructor() { }

  ngOnInit() {
  }

  public sidenavToggle(): void {
    this.memberSidenav.toggle();
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
