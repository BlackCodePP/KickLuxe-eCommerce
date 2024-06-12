import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {
  constructor(private productsService: ProductsService) { }

  // Método para obtener todos los productos
  onAllProductsClick() {
    this.productsService.getAllProducts();
  }

  // Método para obtener productos por marca
  getProductsByBrand(brand: string) {
    this.productsService.getProductsByBrand(brand);
  }
}

