import { Component } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { Router } from '@angular/router';
import { User, UserService } from '../user.service';
import { FeedbackService } from '../feedback.service';

export interface FeedbackRes {
  id: number;
  title: string;
  content: string;
  rating: number;
  createdAt: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent {
  userEmail: string | null = null;
  userId!: number
  feedbacks: FeedbackRes[] = [];
  editingId!: number;
  editedFeedback: Partial<FeedbackRes> = {};

  constructor(private userAuthService: UserAuthService, private userService: UserService, private feedbackService: FeedbackService, private router: Router) {}

  ngOnInit(): void {
    if(!this.userAuthService.isLoggedIn()) {
      this.router.navigate(['/login'])
    } else {
      this.userEmail = localStorage.getItem('userToken')
    }
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    if(this.userEmail != null) {
      this.userService.getUser(this.userEmail).subscribe({
        next: (res: User) => {
          if(res.id) {
            this.userId = res.id;
          }
          this.feedbackService.getFeedbacks(this.userId).subscribe({
            next: (res: FeedbackRes[]) => {
              this.feedbacks = res;
            },
            error: (err) => {
              console.log(err);
            }
          });
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  deleteFeedback(id: number): void {
    this.feedbackService.deleteFeedback(id).subscribe({
      next: (val) => {
        console.log(val);
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.loadFeedbacks();
  }

  startEdit(feedback: FeedbackRes): void {
    this.editingId = feedback.id;
    this.editedFeedback = { ...feedback };
  }

  cancelEdit(): void {
    this.editingId = 0;
    this.editedFeedback = {};
  }

  saveEdit(): void {
    const feeddbackReq = {
      title: this.editedFeedback.title,
      content: this.editedFeedback.content,
      rating: this.editedFeedback.rating,
      userId: this.editedFeedback.user?.id
    }
    this.feedbackService.updateFeedback(this.editingId, feeddbackReq).subscribe({
      next: (val) => {
        console.log(val);
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.cancelEdit();
    this.loadFeedbacks();
  }
}
