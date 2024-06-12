import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { UserPanelComponent } from '../../user-panel/user-panel.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [HeaderComponent,UserPanelComponent,FooterComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})

export class UserPageComponent {

}
