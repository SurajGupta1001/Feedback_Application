import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  dob: string = '';
  newPassword: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    const req = {
      email: this.email,
      dob: this.dob,
      newPassword: this.newPassword
    }
    this.userService.changeUserPassword(req).subscribe({
      next: (val) => {
        console.log(val);
        alert(`Password change Succesfully.`)
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
        alert(`Invalid Credential`);
      }
    })
  }
}
