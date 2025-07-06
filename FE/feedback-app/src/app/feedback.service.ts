import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FeedbackRes } from "./feedback-list/feedback-list.component";

interface Feedback {
    userId: number,
    title: string,
    content: string,
    rating: number
}

@Injectable({
    providedIn: 'root'
})
export class FeedbackService {
    constructor(private http: HttpClient) {}

    private baseUrl = 'http://localhost:8080/api/feedback';

    submitFeedback(feedback: Feedback): Observable<any> {
        return this.http.post(`${this.baseUrl}/submit`, feedback);
    }

    getFeedbacks(userId: number): Observable<FeedbackRes[]> {
        return this.http.get<FeedbackRes[]>(`${this.baseUrl}`, {
            params: {
                userId: userId
            }
        });
    }

    updateFeedback(feedbackId: number, feedbackReq: any): Observable<string> {
        return this.http.post<string>(`${this.baseUrl}/update/${feedbackId}`, feedbackReq, {
            responseType: 'TEXT' as 'json'
        });
    }

    deleteFeedback(feedbackId: number):Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/delete/${feedbackId}`, null, {
            responseType: 'TEXT' as 'json'
        });
    }
}