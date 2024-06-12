import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { ProductsComponent } from '../../products/products.component';
import { AuthService } from '../../../services/auth.service';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent,SidebarComponent,ProductsComponent, FooterComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})

export class HomePageComponent {
  constructor(private authService: AuthService) {}

  // Recuperar los datos del usuario del servicio de autenticación
  ngOnInit() {
    const userData = this.authService.getUserData();
    if (userData) {
      console.log('Datos del usuario:', userData); // Muestra los datos del usuario por consola
    }
  }
}
