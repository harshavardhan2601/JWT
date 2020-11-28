import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'

interface TokenResponse {
  token: string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uri = 'http://localhost:3000';
  private token: string


  constructor( private http: HttpClient,private router: Router) {
  }

  public saveToken(token: string): void {
    localStorage.setItem('usertoken', token)
    this.token = token
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken')
    }
    return this.token
  }

  public getUserDetails(): User {
    const token = this.getToken()
    // console.log(token)
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      // console.log(payload)
      return JSON.parse(payload)
    } else {
      return null
    }
  }


  public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    console.log(user);
    if (user) {
      return true
    } else {
      return false
    }
  }

  signup(data) {
    console.log(data);
    var obj = {
      username:data.username,
      password:data.password,
      email:data.email,
      first_name:data.first_name,
      last_name:data.last_name
   }
    return this.http.post(`${this.uri}/signdata`, obj)
    // .pipe()
    // .subscribe(res => console.log('Done'));
  }

  logindata(data) {
    console.log(data)
    var obj ={
      username:data.username,
      password: data.password
    }
    return this.http.post(`${this.uri}/logindata`, obj)

  }

  public profile(): Observable<any> {
    return this.http.get(`${this.uri}/profile`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  public logout(): void {
    console.log('logout')
    this.token = ''
    window.localStorage.removeItem('usertoken')
    this.router.navigateByUrl('/auth/login')
  }

 }
