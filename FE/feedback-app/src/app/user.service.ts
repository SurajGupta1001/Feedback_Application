import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { observableToBeFn } from "rxjs/internal/testing/TestScheduler";

export interface User {
    id?: number
    name: string,
    email: string,
    dob: string,
    password: string,
    role?: string
}
@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) {}

    private baseUrl = 'http://localhost:8080/api/users/user';

    register(user: User): Observable<any> {
        return this.http.post(`${this.baseUrl}`, user);
    }

    validateUser(email: string, password: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/validate`, {
            params: {
                email: email,
                password: password
            },
            responseType: 'text' as 'json'
        });
    }

    getUser(email: string): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}`, {
            params: {
                email: email
            }
        });
    }

    changeUserPassword(req: any):Observable<any> {
        return this.http.post(`${this.baseUrl}/changePassword`,
            {
                email: req.email,
                dob: req.dob,
                newPassword: req.newPassword
            },
            {
                responseType: 'TEXT' as 'json'
            }
        );
    }
}