import { Component, OnInit } from "@angular/core";

import { DataService } from "../../services/data.service";
import { ActivatedRoute } from "@angular/router";

import { Session } from "../../entity/Session";

@Component({
  selector: "app-edit-session",
  templateUrl: "./edit-session.component.html",
  styleUrls: ["./edit-session.component.css"]
})
export class EditSessionComponent implements OnInit {
  model = new Session("", "", "", [], [], [], [], []);
  submitted = false;
  session_type_options = [
    "Development/Testing",
    "Practice",
    "Race",
    "Recreation",
    "Other"
  ];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // console.log("EditSessionFormComponent.ngOnInit() called");

    this.getDetails();
  }

  getDetails() {
    const id = this.route.snapshot.paramMap.get("_id");
    this.dataService.getSessionDetails(id).subscribe((data: Session) => {
      this.model = data;
    });
  }

  updateSession() {
    const id = this.route.snapshot.paramMap.get("_id");
    var updated_session = {
      name: this.model.name,
      record_date: this.model.record_date,
      session_type: this.model.session_type
    };
    this.dataService.updateSession(id, updated_session).subscribe(
      res => {
        console.log(res); // Need to do something more meaningful with this later
      },
      err => console.error(err),
      () => {
        console.log("Done Sending Update Form");
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    this.updateSession();
  }

  clearInput() {
    this.model = new Session("", "", "", [], [], [], [], []);
  }

  // TODO: Remove this when we're done
  get diagnostic() {
    return JSON.stringify(this.model);
  }
}
