import { Component } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private userAuthService: UserAuthService, private userService: UserService, private router: Router) {}

  onLogin(): void {
    this.userService.validateUser(this.email, this.password).subscribe({
      next: (res: string) => {
        console.log(res);
        this.userAuthService.login(this.email);
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert('Invalid Input');
      }
    })

  }
}
