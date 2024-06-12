import { Component } from '@angular/core';
import { LoginFormComponent } from '../../forms/login-form/login-form.component'; 
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginFormComponent,HeaderComponent, FooterComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})

export class LoginPageComponent {
 
}
