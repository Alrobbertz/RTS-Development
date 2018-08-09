import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";

import { Session } from "../../entity/Session";

@Component({
  selector: "app-all-sessions",
  templateUrl: "./all-sessions.component.html",
  styleUrls: ["./all-sessions.component.css"]
})
export class AllSessionsComponent implements OnInit {
  sessions: Session[];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getAllSessions();
  }

  getAllSessions() {
    this.dataService.getAllSessions().subscribe(
      sessions => {
        this.sessions = sessions;
      },
      err => {
        console.error(err);
      }
    );
  }
}
