import { Directive, ElementRef, Input, Renderer2, OnInit, Inject, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[evhAnimationMenu]',
  exportAs: 'AnimateMenu'
})
export class AnimationMenuDirective implements OnInit, AfterViewInit {

  @Input() protected panelClass: string;
  constructor(
    public menuElement: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  ngOnInit(): void {
    const cssStyles: StyleSheetList = this.document.styleSheets;

    for (let i = 0; i < cssStyles.length; i++) {
      const item: StyleSheet = cssStyles.item(i);

      if (item.ownerNode.nodeName === 'STYLE') {
        for (let styleRuleItemIndex = 0; styleRuleItemIndex < item['cssRules'].length; styleRuleItemIndex++) {
          if (null != item['cssRules'][styleRuleItemIndex]
            && null != item['cssRules'][styleRuleItemIndex]['selectorText']
            && item['cssRules'][styleRuleItemIndex]['selectorText'].includes(`.${this.panelClass}`)) {

            const ruleItems: string[] = item['cssRules'][styleRuleItemIndex]['style'].cssText.split(';');

            ruleItems.forEach((ruleItem: string) => {
              const [cssRule, value] = ruleItem.split(':');
              if (cssRule !== '') {
                this.renderer.setStyle(this.menuElement.nativeElement, cssRule.trim(), value.trim());
              }
            });
          }
        }
      }
    }
  }

  ngAfterViewInit(): void {
  }
}
