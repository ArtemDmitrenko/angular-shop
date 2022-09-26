import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { ProductsService } from '../../services/product.service';
import { IProduct } from '../../models/product';

// import { IProduct } from 'src/app/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: any;
  errorText: string;
  isLoaded: boolean = false;

  constructor(
    private storageService: StorageService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    const currentUser = this.storageService.getUser();
    const { id, token } = currentUser;
    console.log(token);
    this.productsService.getAllProducts(token).subscribe({
      next: (data: any) => {
        console.log('products', data.products);
        this.products = data.products;
        this.isLoaded = true;
      },
      error: (err: any) => {
        console.log(err);
        if (err.error) {
          this.errorText = JSON.parse(err.error).message;
        } else {
          this.errorText = 'Error with status: ' + err.status;
        }
      },
    });

    // this.isLoggedUser = this.storageService.isLoggedIn();
  }
}
