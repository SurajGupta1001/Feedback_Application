import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user = {
    name: '',
    email: '',
    dob: '',
    password: ''
  };

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(): void {
    console.log(this.user)
    this.userService.register(this.user).subscribe({
      next: () => {
        alert('user register successfully!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log('Registration error : ', err);
        alert('Registration failed. ');
      }
    })
  }
  
}
