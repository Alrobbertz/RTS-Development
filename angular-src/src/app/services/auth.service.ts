import { Injectable } from "@angular/core";

import { Http, Headers } from "@angular/http";
import { map, catchError } from "rxjs/operators";

import { JwtHelperService } from "@auth0/angular-jwt";

const helper = new JwtHelperService();

@Injectable({
  providedIn: "root"
})
export class AuthService {
  authToken: any;
  user: any;

  production = true;
  baseURL = "";

  constructor(private http: Http, public jwtHelper: JwtHelperService) {
    if (this.production) {
      this.baseURL = "";
    } else {
      this.baseURL = "http://localhost:3000";
    }
  }

  registerUser(user) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post(this.baseURL + "/api/users/register", user, {
        headers: headers
      })
      .pipe(map(res => res.json()));
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post(this.baseURL + "/api/users/authenticate", user, {
        headers: headers
      })
      .pipe(map(res => res.json()));
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this.authToken);
    return this.http
      .get(this.baseURL + "/api/users/profile", {
        headers: headers
      })
      .pipe(map(res => res.json()));
  }

  storeUserData(token, user) {
    localStorage.setItem("id_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem("id_token");
    this.authToken = token;
  }

  loggedIn() {
    const token = this.jwtHelper.tokenGetter();
    if (!token) return false;

    return !this.jwtHelper.isTokenExpired();
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
