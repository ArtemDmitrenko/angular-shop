import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { IProduct } from '../../models/product';
import { StorageService } from '../../services/storage.service';
import { ProductsService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  id: number;
  private subscription: Subscription;
  product: IProduct;
  errorText: string;
  isLoaded: boolean = false;
  title: string = 'product';

  constructor(
    private storageService: StorageService,
    private productsService: ProductsService,
    private activateRoute: ActivatedRoute
  ) {
    this.subscription = activateRoute.params.subscribe(
      (params) => (this.id = params['id'])
    );
  }

  ngOnInit(): void {
    const currentUser = this.storageService.getUser();
    const { token } = currentUser;
    this.productsService.getProduct(this.id, token).subscribe({
      next: (data: IProduct) => {
        this.product = data;
        this.isLoaded = true;
      },
      error: (err: any) => {
        this.errorText = err.error.message;
      },
    });
  }
}
