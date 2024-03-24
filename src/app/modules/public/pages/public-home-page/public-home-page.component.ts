import { Component, OnInit } from '@angular/core';
import { HEX_CONTENT_MENU } from './hexagon-menu-content';
import { HexMenuContent } from './hexagon-menu-content.model';
import { ViewportScroller, NgFor, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'evh-public-home-page',
    templateUrl: './public-home-page.component.html',
    styleUrls: ['./public-home-page.component.scss'],
    standalone: true,
    imports: [NgFor, NgStyle, RouterLink]
})
export class PublicHomePageComponent implements OnInit {

  public menuContent: HexMenuContent[] = HEX_CONTENT_MENU;
  constructor(private viewPortScroller: ViewportScroller) { }

  ngOnInit() {
  }

  public scrollTo(anchor: string): void {
    this.viewPortScroller.scrollToAnchor(anchor);
  }
}
