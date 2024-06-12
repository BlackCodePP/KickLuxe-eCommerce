import { Component,OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/IUser';
import { OrderService } from '../../services/order.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IUserOrders } from '../../interfaces/IUserOrders';
import { IUserProducts } from '../../interfaces/IUserProducts';

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.scss'
})

export class UserPanelComponent implements OnInit{
  userData: IUser | undefined;
  userOrders: IUserOrders[] | undefined;
  userProducts: IUserProducts[] | undefined;

  constructor(private authService: AuthService, private orderService: OrderService ) { }

  ngOnInit() {
    // Crear un observable a partir de los datos del usuario
    of(this.authService.getUserData()).pipe(
      // Usar switchMap para cambiar a un nuevo observable
      switchMap((userData: IUser) => {
        this.userData = userData;
        // Devolver un nuevo observable que obtiene los pedidos del usuario
        return this.orderService.getOrdersByUser(userData.id);
      })
    ).subscribe((orders: any[]) => {
      // Asignar los pedidos a la variable userOrders
      this.userOrders = orders;
    });
  }
}
