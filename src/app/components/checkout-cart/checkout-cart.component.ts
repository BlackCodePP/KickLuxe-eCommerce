import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { IProduct } from '../../interfaces/IProduct';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-cart',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './checkout-cart.component.html',
  styleUrl: './checkout-cart.component.scss'
})

export class CheckoutCartComponent implements OnInit {
  cartItems: { product: IProduct, quantity: number }[] = [];
  individualProducts: IProduct[] = [];
  totalFinalPrice: number = 0;
  errorMessage: string = '';

  // Formulario de validación
  validatecheckoutForm = new FormGroup({
    direccion: new FormControl('', Validators.required),
    telefono: new FormControl('',Validators.required)
  });

  constructor(private cartService: CartService, private orderService: OrderService, private authService: AuthService, private router: Router) { }

  // Método que se recibe los productos individuales del carrito y se calcula el precio total
  ngOnInit() {
    this.cartService.getCart().subscribe(cart => {
      this.individualProducts = this.breakdownProducts(cart);
      this.totalFinalPrice = this.cartService.getTotalPrice();
    });
  }
  
  // Método para desglosar los productos
  breakdownProducts(individualProducts: { product: IProduct, quantity: number }[]): IProduct[] {
    let products: IProduct[] = [];
    for (let item of individualProducts) {
      for (let i = 0; i < item.quantity; i++) {
        // Clonar el producto para cada cantidad
        let product = { ...item.product, quantity: 1, selectedTalla: undefined };
        products.push(product);
      }
    }
    return products;
  }

  // Método para manejar el checkout
  onCheckout() {  
    // Verificar si todos los productos tienen una talla seleccionada
    if (this.individualProducts.some(item => item.selectedTalla === undefined)) {
      this.errorMessage = 'Por favor, selecciona una talla para todos los productos';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
  
    // Crear el objeto de pedido
    const order = {
      cliente_id:  this.authService.getUserData().id,
      productos: this.individualProducts.map(item => ({
        id: item.id,
        talla: item.selectedTalla ?? 0
      })),
      precio_total: this.totalFinalPrice 
    };
    
    // Insertar el pedido
    this.orderService.insertOrder(order).subscribe({
      next: success => {
        this.cartService.clearCart(); // Limpiar el carrito
        alert('Pedido realizado correctamente');
        this.router.navigate(['/home']);
      },
      error: error => {
        console.error(error);
      }
    });
  }

  // Método para disminuir la cantidad de un producto
  decreaseQuantity(product: IProduct) {
    this.cartService.decreaseQuantity(product);
    this.totalFinalPrice = this.cartService.getTotalPrice();
  }
}