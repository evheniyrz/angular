import 'jasmine';
import { AnimationMenuDirective } from './evh-menu.directive';
import { ElementRef, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';

export class MockElementRef extends ElementRef { constructor() { super(null); } }

describe('Directive: AnimationMenuDirective', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AnimationMenuDirective
      ],
      providers: [Renderer2,
        { provide: ElementRef, useClass: MockElementRef }]
    }).compileComponents();
  });


  it('should create an instance', () => {
    let renederer: Renderer2;
    const element: ElementRef<any> = null;
    const directive = new AnimationMenuDirective(element, renederer);
    expect(directive).toBeTruthy();
  });
});
