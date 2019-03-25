
import {map} from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
// import * as jwt from 'jsonwebtoken';
//import { JwtHelperService } from '@auth0/angular-jwt';   
import { JwtHelper } from 'angular2-jwt';
import * as moment from 'moment';
import 'rxjs/Rx';

//const jwt = new JwtHelperService();
const jwt: JwtHelper = new JwtHelper();

class DecodedToken {
    exp: number = 0;
    username: string = '';
} 

@Injectable()
export class AuthService {
    private decodedToken;

    constructor(private http: HttpClient) {
        this.decodedToken = JSON.parse(localStorage.getItem('bwm_meta')) || new DecodedToken();
    }

    private saveToken(token) {
        this.decodedToken = jwt.decodeToken(token);
        localStorage.setItem('bwm_auth', token);
        localStorage.setItem('bwm_meta', JSON.stringify(this.decodedToken));
        return token;
    }

    private getExpiration() {
        return moment.unix(this.decodedToken.exp)
    }

    public register(userData: any): Observable<any> {
        return this.http.post('/api/v1/users/register', userData);
    }

    public login(userData: any): Observable<any> {
        return this.http.post('/api/v1/users/auth', userData).pipe(map(
            (token: string) => {
                return this.saveToken(token);
            }
        ));
    }

    public logout() {
        localStorage.removeItem('bwm_auth');
        localStorage.removeItem('bwm_auth');

        this.decodedToken = new DecodedToken();
    }

    public isAuthenticated() {
        return moment().isBefore(this.getExpiration()); 
    }

    public getUsername(): string {
        return this.decodedToken.username;
    }

    public getUserId(): string {
        return this.decodedToken.userId;
    }

    public getAuthToken(): string {
        return localStorage.getItem('bwm_auth');
    }
}