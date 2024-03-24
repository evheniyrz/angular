import { Component, OnInit } from '@angular/core';
import { PublicFooterComponent } from '../shared-public/components/public-footer/public-footer.component';
import { RouterOutlet } from '@angular/router';
import { PublicHeaderComponent } from '../shared-public/components/public-header/public-header.component';

@Component({
    selector: 'evh-public',
    templateUrl: './public.component.html',
    styleUrls: ['./public.component.scss'],
    standalone: true,
    imports: [PublicHeaderComponent, RouterOutlet, PublicFooterComponent]
})
export class PublicComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
