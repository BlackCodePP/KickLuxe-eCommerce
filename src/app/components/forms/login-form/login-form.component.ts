import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import  {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';



@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})

export class LoginFormComponent  {
  
  errorMessage: string = '';

  constructor(private authService: AuthService,private router: Router,private cartService: CartService) {}

  // Creación del formulario de inicio de sesión con validaciones
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('',Validators.required)
  });

  // Función para enviar los datos del formulario al servicio de autenticación y recibir la respuesta
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (email && password) {
        this.authService.login({ email, password }).subscribe({
          next: response => {
            if (response.data) {
              this.authService.setLoggedIn(true);
              sessionStorage.setItem('isLoggedIn', 'true'); // Guarda el estado de inicio de sesión en el sessionStorage
              sessionStorage.setItem('userData', JSON.stringify(response.data)); // Guarda los datos del usuario en el sessionStorage
              this.cartService.loadCart(); // Carga el carrito del usuario
              this.router.navigate(['/home']);
            } else {
              this.errorMessage = response.error;
            }
          },
          error: error => {
            this.errorMessage = error;
          }
        });
      }
    }
  }
}

