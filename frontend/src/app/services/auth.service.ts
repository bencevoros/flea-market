import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

    private jwtHelper: JwtHelperService = new JwtHelperService();

    constructor() { }

    public isAuthenticated(): boolean {
        const auth = localStorage.getItem('auth');
        if (!auth) {
            return false;
        }

        try {
            const token = JSON.parse(auth).token;

            return !this.jwtHelper.isTokenExpired(token);
        } catch (err) {
            return false;
        }
    }

    public removeAuth() {
        localStorage.removeItem('auth');
    }

}
