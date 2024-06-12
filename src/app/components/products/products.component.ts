import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../interfaces/IProduct';
import { AuthService } from '../../services/auth.service';
import { LoginFormComponent } from '../forms/login-form/login-form.component';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})

export class ProductsComponent implements OnInit {

  products: IProduct[] = [];
  isLoggedIn: boolean | undefined;

  constructor(private productsService: ProductsService, private authService: AuthService, private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    // Suscripción a los productos del servicio de productos
    this.productsService.products.subscribe(
      products => {
        // Actualizar la variable products con los productos recibidos
        this.products = products;
      }
    );

    // Obtener todos los productos del servicio de productos
    this.productsService.getAllProducts();

    // Suscripción al estado de inicio de sesión del servicio de autenticación
    this.authService.isLoggedIn.subscribe(isLoggedIn => {
      // Actualizar la variable isLoggedIn con el estado de inicio de sesión recibido
      this.isLoggedIn = isLoggedIn;
    });
  }

  // Método para añadir un producto al carrito
  addToCart(product: IProduct) {
    if (this.isLoggedIn) {
      this.cartService.addToCart(product);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
