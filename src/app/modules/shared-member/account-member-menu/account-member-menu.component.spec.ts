import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMemberMenuComponent } from './account-member-menu.component';

describe('AccountMemberMenuComponent', () => {
  let component: AccountMemberMenuComponent;
  let fixture: ComponentFixture<AccountMemberMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountMemberMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMemberMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
