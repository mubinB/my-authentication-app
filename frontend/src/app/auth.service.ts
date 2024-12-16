import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN'; 
  private loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  private http = inject(HttpClient);

  constructor() { }

  login(user:{ username: string, password: string}): Observable<any> {
    return this.http
    .post('http://localhost:8080/authenticate', user)
    .pipe(tap((response:any) => this.doLoginUser(user.username, response.token)))
  }

  private doLoginUser(username: string, token: string): void {
    this.loggedUser = username;
    this.storeJwt(token);
    this.isAuthenticatedSubject.next(true)
  }

  private storeJwt(token: string) {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
  }


}
