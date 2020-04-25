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
  public headderTitleContent: { [key: string]: string }[];
  private onDestroy$: Subject<boolean> = new Subject();

  @ViewChild('memberSidenav') private memberSidenav: MatSidenav;
  constructor() { }

  ngOnInit() {
    this.headderTitleContent = this.createHeaderTitle('space exploration');
  }

  public sidenavToggle(): void {
    this.memberSidenav.toggle();
  }

  private createHeaderTitle(value: string): { [key: string]: string }[] {
    const resource: { [key: string]: string }[] = [];
    let fontSize;
    for (let i = 0; i < value.length; i++) {
      let charConfig;
      if (i < value.length / 2) {
        fontSize = 13 + i * 2;
        charConfig = { [value.charAt(i)]: `${fontSize}px` };
      } else {
        fontSize = fontSize - 2;
        charConfig = { [value.charAt(i)]: `${fontSize}px` };
      }
      resource.push(charConfig);
      charConfig = null;
    }
    return resource;
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
