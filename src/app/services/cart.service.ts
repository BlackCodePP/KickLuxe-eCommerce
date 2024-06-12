import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../interfaces/IProduct';
import { AuthService } from './auth.service';
import { IUser } from '../interfaces/IUser';

interface CartItem {
  product: IProduct;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})

// BehaviorSubjects para almacenar el carrito, el precio total y la cantidad total
export class CartService {
  private cart: BehaviorSubject<CartItem[]>;
  private totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private totalQuantity: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private authService: AuthService) {
    const user = this.authService.getUserData();
      // Inicializar el carrito con los elementos guardados en localStorage
      this.cart = new BehaviorSubject<CartItem[]>(this.getInitialCart(user));
      // Suscribirse al carrito para almacenar los cambios en localStorage
      this.cart.subscribe(cart => this.storeCart(cart, user));
    }
  
  // Método para obtener el carrito como un Observable
  getCart() {
    return this.cart.asObservable();
  }

  // Método para establecer el precio total
  setTotalPrice(price: number) {
    this.totalPrice.next(price);
  }
  
  // Método para obtener el carrito inicial del usuario
  private getInitialCart(user: IUser) {
      if (user) {
        const storedCart = localStorage.getItem('cart-' + user.id);
        return storedCart ? JSON.parse(storedCart) : [];
      } else {
        return [];
      }
  }
      
  // Método para almacenar el carrito en localStorage
  private storeCart(cart: CartItem[], user: IUser) {
  if (user) {
      localStorage.setItem('cart-' + user.id, JSON.stringify(cart));
  }
  }

  // Método para actualizar la cantidad total de elementos en el carrito
  updateTotalQuantity() {
    const currentCart = this.cart.getValue();
    const totalQuantity = currentCart.reduce((total, item) => total + item.quantity, 0);
    this.totalQuantity.next(totalQuantity);
  }

  // Método para obtener la cantidad total de elementos en el carrito como un Observable
  getTotalQuantity() {
    return this.totalQuantity.asObservable();
  }

  // Método para añadir un producto al carrito
  addToCart(product: IProduct, quantity: number = 1) {
      const currentCart = this.cart.getValue();
      const itemIndex = currentCart.findIndex(item => item.product.id === product.id);
      
      if (itemIndex > -1) {
        // Si el producto ya está en el carrito, incrementa la cantidad
        currentCart[itemIndex].quantity += quantity;
      } else {
        // Si el producto no está en el carrito, lo añade
        currentCart.push({ product, quantity });
      }
      
      this.cart.next(currentCart);
      const user = this.authService.getUserData(); // Obtiene el usuario actual
      this.storeCart(currentCart, user); // Pasa el usuario al método storeCart
      this.updateTotalQuantity();
      window.alert('Producto añadido al carrito');
  }
      
  // Método para eliminar un producto del carrito
  removeFromCart(product: IProduct) {
      const currentCart = this.cart.getValue();
      const updatedCart = currentCart.filter(item => item.product.id !== product.id);
      this.cart.next(updatedCart);
      const user = this.authService.getUserData(); // Obtiene el usuario actual
      this.storeCart(updatedCart, user); // Pasa el usuario al método storeCart
      this.updateTotalQuantity();
  }

  // Método para obtener el precio total del carrito
  getTotalPrice() {
    const currentCart = this.cart.getValue();
    const totalPrice = currentCart.reduce((total, item) => total + (item.product.precio * item.quantity), 0);
    return Number(totalPrice.toFixed(2));
  }

  // Método para incrementar la cantidad de un producto en el carrito
  increaseQuantity(product: IProduct) {
      const currentCart = this.cart.getValue();
      const itemIndex = currentCart.findIndex(item => item.product.id === product.id);

      if (itemIndex > -1) {
      currentCart[itemIndex].quantity++;
      this.cart.next(currentCart);
      this.updateTotalQuantity();
      }
  }

  // Método para disminuir la cantidad de un producto en el carrito
  decreaseQuantity(product: IProduct) {
    const currentCart = this.cart.getValue();
    const itemIndex = currentCart.findIndex(item => item.product.id === product.id);

    if (itemIndex > -1) {
    if (currentCart[itemIndex].quantity > 1) {
        // Si la cantidad es mayor que 1, disminuye la cantidad
        currentCart[itemIndex].quantity--;
    } else {
        // Si la cantidad es 1, elimina el producto del carrito
        currentCart.splice(itemIndex, 1);
    }

    this.cart.next(currentCart);
    this.updateTotalQuantity();
    }
  }

  // Método para cargar el carrito del usuario
  loadCart() {
    const user = this.authService.getUserData();
    const storedCart = this.getInitialCart(user);
    this.cart.next(storedCart);
  }

  // Método para vaciar el carrito
  clearCart() {
    const user = this.authService.getUserData();
    if (user) {
      localStorage.removeItem('cart-' + user.id);
    }
    this.cart.next([]);
    this.totalQuantity.next(0);
  }
}