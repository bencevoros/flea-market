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

    public getUserId(): number | undefined {
        const auth = localStorage.getItem('auth');
        
        if (!auth) {
            return;
        }

        try {
            const token = JSON.parse(auth).token;

            return this.jwtHelper.decodeToken(token).userId;
        } catch (err) {
            return undefined;
        }
    }

    public removeAuth() {
        localStorage.removeItem('auth');
    }

}
