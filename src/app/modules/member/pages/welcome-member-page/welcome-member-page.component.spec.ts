import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeMemberPageComponent } from './welcome-member-page.component';

describe('DefaultMemberPageComponent', () => {
  let component: WelcomeMemberPageComponent;
  let fixture: ComponentFixture<WelcomeMemberPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeMemberPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeMemberPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
