import { Component } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { Router } from '@angular/router';
import { User, UserService } from '../user.service';
import { FeedbackService } from '../feedback.service';

@Component({
  selector: 'app-submit-feedback',
  templateUrl: './submit-feedback.component.html',
  styleUrls: ['./submit-feedback.component.css']
})
export class SubmitFeedbackComponent {
  userEmail: string | null = null;
  userId!: number;
  feedback = {
    userId: 1,
    title: '',
    content: '',
    rating: 5
  };

  constructor(private userAuthService: UserAuthService, private userService: UserService, private feedbackService: FeedbackService, private router: Router) {
    if(!userAuthService.isLoggedIn()) {
      router.navigate(['/login'])
    } else {
      this.userEmail = localStorage.getItem('userToken');
    }
  }

  onSubmit(): void {
    if(this.userEmail != null) {
      this.userService.getUser(this.userEmail).subscribe({
        next: (res: User) => {
          console.log(res);
          if(res.id) {
            this.userId = res.id;
          }
          const feedbackReq = {
            userId: this.userId,
            title: this.feedback.title,
            content: this.feedback.content,
            rating: this.feedback.rating
          };
          this.feedbackService.submitFeedback(feedbackReq).subscribe({
            next: (res) => {
              console.log(res);
              this.router.navigate(['/feedbacks'])
            },
            error: (err) => {
              console.log(err);
            }
          })
        },
        error: (err) => {
          console.log(err);
        }
      });

      
    }
  }
}
