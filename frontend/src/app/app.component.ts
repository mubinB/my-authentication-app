import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  authService = inject(AuthService);

  constructor() {
    this.authService.login( {
      'username': 'mbn32',
      'password': 'maste@1996'
    }).subscribe((response) => console.log(response)) 
  }
}
