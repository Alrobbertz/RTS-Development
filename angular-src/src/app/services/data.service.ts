import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { Session } from "../entity/Session";

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private http: Http) {}

  getAllSessions() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .get("http://localhost:3000/api/sessions/all", { headers: headers })
      .pipe(map(res => res.json()));
  }

  getSessionDetails(_id: String) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .get("http://localhost:3000/api/sessions/details/" + _id, {
        headers: headers
      })
      .pipe(map(res => res.json()));
  }

  updateSession(_id: String, session) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .put("http://localhost:3000/api/sessions/update/" + _id, session, {
        headers: headers
      })
      .pipe(map(res => res.json()));
  }

  uploadSession(session) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post("http://localhost:3000/api/sessions/upload", session, {
        headers: headers
      })
      .pipe(map(res => res.json()));
  }

  deleteSession(_id: String) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .delete("http://localhost:3000/api/sessions/delete/" + _id, {
        headers: headers
      })
      .pipe(map(res => res.json()));
  }
}
