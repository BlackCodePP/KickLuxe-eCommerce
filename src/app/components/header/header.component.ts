import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,ShoppingCartComponent,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit{

  loggedIn: boolean = false;
  totalQuantity: number = 0;
  
  constructor(private authService: AuthService, private cdr: ChangeDetectorRef, private router: Router, private cartService: CartService) {}
  

  ngOnInit() {
    // Suscripción al carrito de compras para actualizar la cantidad total de productos
    this.cartService.getCart().subscribe(cart => {
      this.cartService.updateTotalQuantity();
    });

    // Suscripción a la cantidad total de productos para actualizar la variable totalQuantity
    this.cartService.getTotalQuantity().subscribe(quantity => {
      this.totalQuantity = quantity;
    });
    
    // Suscripción al estado de inicio de sesión para actualizar la variable loggedIn
    this.authService.isLoggedIn.subscribe(value => {
      this.loggedIn = value;
      this.cdr.detectChanges();
    });
    
    if (sessionStorage.getItem('redirectToHome')) {
      sessionStorage.removeItem('redirectToHome');
      this.router.navigate(['/home']);
    }
  }

  // Método para cerrar la sesión del usuario
  logout() {
    this.authService.setLoggedIn(false);
    sessionStorage.removeItem('isLoggedIn');
    this.authService.clearUserData();
    sessionStorage.setItem('redirectToHome', 'true');
    location.reload();
  }
}
