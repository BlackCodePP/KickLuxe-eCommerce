import { Component } from '@angular/core';
import { RegisterComponent } from '../../forms/register/register.component';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RegisterComponent,HeaderComponent, FooterComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})

export class RegisterPageComponent {

}
