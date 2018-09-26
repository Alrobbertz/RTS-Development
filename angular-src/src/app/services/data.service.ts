import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DataService {
  production = true; // TODO Change the to TRUE for production build
  baseURL = "";

  constructor(private http: Http) {
    if (this.production) {
      this.baseURL = "";
    } else {
      this.baseURL = "http://localhost:3000";
    }
  }

  getAllSessions() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .get(this.baseURL + "/api/sessions/all", { headers: headers })
      .pipe(map(res => res.json()));
  }

  getSessionDetails(_id: String) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .get(this.baseURL + "/api/sessions/details/" + _id, {
        headers: headers
      })
      .pipe(map(res => res.json()));
  }

  updateSession(_id: String, session) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .put(this.baseURL + "/api/sessions/update/" + _id, session, {
        headers: headers
      })
      .pipe(map(res => res.json()));
  }

  uploadSession(session) {
    return this.http
      .post(this.baseURL + "/api/sessions/upload", session)
      .pipe(map(res => res.json()));
  }

  deleteSession(_id: String) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .delete(this.baseURL + "/api/sessions/delete/" + _id, {
        headers: headers
      })
      .pipe(map(res => res.json()));
  }
}
