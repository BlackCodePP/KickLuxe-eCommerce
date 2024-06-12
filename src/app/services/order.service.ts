import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrder } from '../interfaces/IOrder';
import { IUserOrders } from '../interfaces/IUserOrders';

@Injectable({
  providedIn: 'root'
})

export class OrderService {
    private apiUrl = 'http://localhost/api.php/order';

    constructor(private http: HttpClient) { }

    // Método para insertar un pedido
    insertOrder(order: IOrder): Observable<any> {
        return this.http.post(this.apiUrl, order);
    }

    // Método para obtener los pedidos de un usuario
    getOrdersByUser(userId: number): Observable<IUserOrders[]> {
      return this.http.get<IUserOrders[]>(`${this.apiUrl}/user/${userId}`);
    }
}