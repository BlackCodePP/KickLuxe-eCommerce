import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../interfaces/IProduct';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'http://localhost/api.php/products';

  constructor(private http: HttpClient) { }

  // BehaviorSubject para almacenar los productos
  products = new BehaviorSubject<IProduct[]>([]);

  // Método para obtener todos los productos
  getAllProducts(): void {
    this.http.get<IProduct[]>(this.apiUrl).subscribe({
      next: products => {
        this.products.next(products);
      },
      error: error => {
        console.error(error);
      }
    });
  }
  
  // Método para obtener los productos de una marca específica
  getProductsByBrand(brand: string): void {
    this.http.get<IProduct[]>(`${this.apiUrl}?brand=${brand}`).subscribe({
      next: products => {
        this.products.next(products);
      },
      error: error => {
        console.error(error);
      }
    });
  }
}
