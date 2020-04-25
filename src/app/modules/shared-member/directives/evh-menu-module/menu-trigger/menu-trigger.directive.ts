import {
  Directive,
  ElementRef,
  OnInit,
  AfterViewInit,
  Input,
  TemplateRef,
  ViewContainerRef,
  EmbeddedViewRef,
  OnDestroy,
  Renderer2,
  Inject,
  Output,
  EventEmitter
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { MenuStateTypes } from '../menu-state.types';
import { MenuStates } from '../menu-states.enum';
import { AnimationMenuDirective } from '../animation-menu-directive/evh-menu.directive';
import { DOCUMENT } from '@angular/common';

export const ROOT_PANEL_CSS_CLASS = 'menu-panel';
export const MENU_OPEN_CSS_ANIMATION_CLASS = 'menu-animation-open';
export const MENU_CLOSE_CSS_ANIMATION_CLASS = 'menu-animation-close';

@Directive({
  selector: '[evhMenuTriggerFor]'
})
export class MenuTriggerDirective implements OnInit, AfterViewInit, OnDestroy {

  private hasView = false;
  private menuElement: HTMLDivElement;
  private trigger: EmbeddedViewRef<any>;
  private onDestroy$: Subject<boolean> = new Subject();
  @Input() set evhMenuTriggerFor(menuElementRef: TemplateRef<AnimationMenuDirective>) {
    if (menuElementRef && !this.hasView) {
      this.trigger = this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
      this.menuElement = menuElementRef['menuElement'].nativeElement;
      this.setRootClass(ROOT_PANEL_CSS_CLASS);
    }
  }
  @Output() menuTrigger: EventEmitter<boolean> = new EventEmitter();
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private renderer: Renderer2) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    const menuTrigger: HTMLButtonElement = this.trigger.rootNodes[0];
    this.setMenuStatus(MenuStates.PENDING);
    this.initializeMenuHeigh(this.menuElement);
    this.renderer.listen(this.menuElement, 'animationend', (event: AnimationEvent) => {
      const menuState = this.menuElement.dataset.menuStatus;
      if (event.animationName === 'menuHeight' && menuState === MenuStates.PENDING) {
        this.setMenuStatus(MenuStates.OPEN);
      }
      if (event.animationName === 'closeMenuWidth' && menuState === MenuStates.CLOSED) {
        this.setMenuStatus(MenuStates.PENDING);
        this.clearAnimation([MENU_OPEN_CSS_ANIMATION_CLASS, MENU_CLOSE_CSS_ANIMATION_CLASS]);
      }
    });

    fromEvent(menuTrigger, 'click').pipe(
      // tslint:disable-next-line: deprecation
      startWith(null),
      takeUntil(this.onDestroy$)
    ).subscribe(
      (event: Event) => {
        if (null != event && event.type === 'click') {
          const menuStatus: string = this.menuElement.dataset.menuStatus;
          switch (menuStatus) {
            case MenuStates.PENDING:
              this.menuTrigger.next(true);
              this.menuOpenStyleAnimation(MENU_OPEN_CSS_ANIMATION_CLASS, MENU_CLOSE_CSS_ANIMATION_CLASS);
              break;
            case MenuStates.OPEN:
              this.setMenuStatus(MenuStates.CLOSED);
              this.menuClosedStyleAnimation(MENU_CLOSE_CSS_ANIMATION_CLASS, MENU_OPEN_CSS_ANIMATION_CLASS);
              this.menuTrigger.next(false);
              break;
            default:
              break;
          }
        }
      }
    );
  }

  private setMenuStatus(state: MenuStateTypes): void {
    this.renderer.setAttribute(this.menuElement, 'data-menu-status', state);
  }

  private setRootClass(rootCssClass: string): void {
    this.renderer.addClass(this.menuElement, rootCssClass);
  }

  private menuOpenStyleAnimation(cssClassAnimationOpenMenu: string, cssClassAnimationCloseMenu: string): void {
    const existingCssClasses: DOMTokenList = this.menuElement.classList;
    if (existingCssClasses.contains(cssClassAnimationCloseMenu)) {
      this.renderer.removeClass(this.menuElement, cssClassAnimationCloseMenu);
    }
    this.renderer.addClass(this.menuElement, cssClassAnimationOpenMenu);
  }

  private menuClosedStyleAnimation(cssClassAnimationCloseMenu: string, cssClassAnimationMenuOpen: string): void {
    const existingCssClasses: DOMTokenList = this.menuElement.classList;
    if (existingCssClasses.contains(cssClassAnimationMenuOpen)) {
      this.renderer.removeClass(this.menuElement, cssClassAnimationMenuOpen);
    }
    this.renderer.addClass(this.menuElement, cssClassAnimationCloseMenu);
  }

  private clearAnimation(animationClassList: string[]): void {
    const existingCssClasses: DOMTokenList = this.menuElement.classList;
    animationClassList.forEach((cssClass: string) => {
      if (existingCssClasses.contains(cssClass)) {
        this.renderer.removeClass(this.menuElement, cssClass);
      }
    });
  }

  private initializeMenuHeigh(element: HTMLElement): void {
    const padding: string = window.getComputedStyle(element).padding;
    const margin: string = window.getComputedStyle(element).margin;

    const initialHeight: number = element.offsetHeight;
    const calculatedChilds: HTMLCollection = element.children;
    let calculatedMenuHeight = 0;

    Array.from(calculatedChilds).forEach((item: Element) => {
      const style = window.getComputedStyle(item);
      calculatedMenuHeight = [
        'height',
        'padding-top',
        'padding-bottom',
        'margin-top',
        'margin-bottom',
        'border-top',
        'border-bottom'
      ].map((key) => parseInt(style.getPropertyValue(key), 10))
        .reduce((prev, cur) => prev + cur);
      calculatedMenuHeight += initialHeight;
    });

    this.insertAnimationRulesForHeight(calculatedMenuHeight, padding, margin);
  }

  private insertAnimationRulesForHeight(height: number, padding: string, margin: string): void {
    const existStyleAnimation = this.document.head.querySelector('style[data-styles="menu-animation"]');
    if (null == existStyleAnimation) {
      const elementAnimationStyle = this.document.createElement('style');
      elementAnimationStyle.setAttribute('data-styles', 'menu-animation');
      this.document.head.appendChild(elementAnimationStyle);

      const rules = [
        `@keyframes menuWidth {
          0% {
            width: 0;
            height: 2px;
            visibility: visible;
            padding: 0;
          }

          100% {
            height: 2px;
            width: 270px;
            padding: 0;
            visibility: visible;
          }
        }`,

        `@keyframes menuHeight {
          0% {
            width: 270px;
            height: 2px;
            padding: 0;
          }

          100% {
            width: 270px;
            height: ${height}px;
            padding: ${padding};
          }
        }`,

        `@keyframes closeMenuWidth {
          0% {
            width: 270px;
            height: 2px;
            padding: 0;
            visibility: visible;
          }

          100% {
            height: 2px;
            width: 0;
            padding: 0;
            visibility: hidden;
          }
        }`,

        `@keyframes closeMenuHeight {
          0% {
            width: 270px;
            height: ${height}px;
            visibility: visible;
          }

          100% {
            width: 270px;
            height: 2px;
            padding: 0;
            visibility: visible;
          }
        }`
      ];

      const styleSheet = elementAnimationStyle.sheet as CSSStyleSheet;

      rules.forEach((rule: string) => {
        styleSheet.insertRule(rule, styleSheet.cssRules.length);
      });
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
