import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { IProduct } from '../../interfaces/IProduct';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})

export class ShoppingCartComponent {
  cart: { product: IProduct, quantity: number }[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService,private router: Router) { }

  // Suscripción al servicio de carrito
  ngOnInit() {
    this.cartService.getCart().subscribe(cart => {
      // Actualizar la variable cart y totalPrice con los datos recibidos
      this.cart = cart;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }
  
  // Método para eliminar un producto del carrito
  removeFromCart(product: IProduct) {
    this.cartService.removeFromCart(product);
    this.totalPrice = this.cartService.getTotalPrice();
  }

  // Método para aumentar la cantidad de un producto en el carrito
  increaseQuantity(product: IProduct) {
    this.cartService.increaseQuantity(product);
    this.totalPrice = this.cartService.getTotalPrice();
  }

  // Método para disminuir la cantidad de un producto en el carrito
  decreaseQuantity(product: IProduct) {
    this.cartService.decreaseQuantity(product);
    this.totalPrice = this.cartService.getTotalPrice();
  }

  // Método para redirigir al usuario a la página de pago
  checkout() {
    this.router.navigate(['/checkout']);
  }
}
