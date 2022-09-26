import { Component, Input } from '@angular/core';

import { IProduct } from '../../models/product';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() cardData: IProduct;

  constructor() {}

  public roundNumber(number: number) {
    return Math.round(number);
  }
}
