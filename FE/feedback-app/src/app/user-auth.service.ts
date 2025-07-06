import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UserAuthService {

    isLoggedIn(): boolean {
        return !!localStorage.getItem('userToken');
    }

    login(token: string) {
        localStorage.setItem('userToken', token);
    }

    logout() {
        localStorage.removeItem('userToken')
    }
}