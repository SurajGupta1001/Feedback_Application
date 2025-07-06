import { Component } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public userAuthService: UserAuthService, private router: Router) {}

  logout() {
    this.userAuthService.logout();
    this.router.navigate(['/login']);
  }

}
