import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Creación del formulario de registro con validaciones
  registerForm = new FormGroup({
    email: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('',Validators.required)
  });

  // Función para enviar los datos del formulario al servicio de autenticación y recibir la respuesta
  onSubmit() {
    if (this.registerForm.valid) {
      const { email,username,password } = this.registerForm.value;
      if (email && username && password) {
        this.authService.register({ email,username,password }).subscribe({
          next: (response) => {
            if (response.success) {
              this.authService.setLoggedIn(true);
              sessionStorage.setItem('isLoggedIn', 'true'); // Guarda el estado de inicio de sesión en el sessionStorage
              sessionStorage.setItem('userData', JSON.stringify(response.data)); // Guarda los datos del usuario en el sessionStorage
              this.router.navigate(['/home']);
            } else if (response.error) {
              this.errorMessage = response.error;
            }
          },
          error: (error) => {
            this.errorMessage = error;
          }
        });
      }
    }
  }
}
