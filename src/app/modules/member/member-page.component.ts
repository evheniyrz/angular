import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'evh-member-page',
  templateUrl: './member-page.component.html',
  styleUrls: ['./member-page.component.scss']
})
export class MemberPageComponent implements OnInit, OnDestroy {
  public profile: any;
  private onDestroy$: Subject<boolean> = new Subject();
  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.auth.userProfile$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(data => {
      this.profile = data;
      console.log('%c PROFILE DATA', 'color: olive', data);
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
