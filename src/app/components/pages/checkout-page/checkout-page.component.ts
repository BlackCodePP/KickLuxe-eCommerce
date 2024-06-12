import { Component } from '@angular/core';
import { CheckoutCartComponent } from '../../checkout-cart/checkout-cart.component';
import { HeaderComponent } from '../../header/header.component';
import { IUser } from '../../../interfaces/IUser';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [HeaderComponent,CheckoutCartComponent, FooterComponent],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.scss'
})

export class CheckoutPageComponent {
  user: IUser = {} as IUser

  constructor() { }

  // Recuperar los datos del usuario del sessionStorage y asignarlos a la variable user
  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('userData') ?? '{}');
  }


}
