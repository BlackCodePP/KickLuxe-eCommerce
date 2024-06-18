import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loadCart() {
    throw new Error('Method not implemented.');
  }

  // BehaviorSubject que almacena el estado de inicio de sesión del usuario
  private loggedIn: BehaviorSubject<boolean>;

  // Inicializar loggedIn con el estado de inicio de sesión del usuario almacenado en sessionStorage
  constructor(private http: HttpClient) {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    this.loggedIn = new BehaviorSubject<boolean>(isLoggedIn);
  }

  // Getter para obtener el estado de inicio de sesión del usuario como un Observable
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  // Método para establecer el estado de inicio de sesión del usuario
  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
    sessionStorage.setItem('isLoggedIn', String(value));
  }

  // Método para obtener los datos del usuario almacenados en sessionStorage
  getUserData() {
    const userData = sessionStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  // Método para borrar los datos del usuario almacenados en sessionStorage
  clearUserData() {
    sessionStorage.removeItem('userData');
  }

  // Método para iniciar sesión
  login(userData: { email: string; password: string }): Observable<any> {
    return this.http.post('http://localhost/api.php/login', userData);
  }

  // Método para registrarse
  register(userData: {
    email: string;
    username: string;
    password: string;
  }): Observable<any> {
    return this.http.post('http://localhost/api.php/register', userData);
  }
}
