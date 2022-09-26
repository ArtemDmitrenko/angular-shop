import { Component, OnInit } from '@angular/core';

import { StorageService } from '../../services/storage.service';
import { ProductsService } from '../../services/product.service';
import { IProduct } from '../../models/product';
import { IProducts } from 'src/app/models/products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: IProduct[];
  errorText: string;
  isLoaded: boolean = false;
  title: string = 'products';

  constructor(
    private storageService: StorageService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    const currentUser = this.storageService.getUser();
    const { token } = currentUser;
    this.productsService.getAllProducts(token).subscribe({
      next: ({ products }: IProducts) => {
        this.products = products;
        this.isLoaded = true;
      },
      error: (err: any) => {
        this.errorText = err.error.message;
      },
    });
  }
}
