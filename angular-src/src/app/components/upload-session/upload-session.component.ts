import { Component, OnInit } from "@angular/core";

import { DataService } from "../../services/data.service";
import { ActivatedRoute } from "@angular/router";

import { Session } from "../../entity/Session";

@Component({
  selector: "app-upload-session",
  templateUrl: "./upload-session.component.html",
  styleUrls: ["./upload-session.component.css"]
})
export class UploadSessionComponent implements OnInit {
  model = {
    name: "",
    record_date: "",
    session_type: "",
    file: ""
  };
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

  ngOnInit() {}

  uploadSession() {
    var session = {
      name: this.model.name,
      record_date: this.model.record_date,
      session_type: this.model.session_type,
      file: this.model.file
    };
    this.dataService.uploadSession(session).subscribe(
      res => {
        console.log(res); // Need to do something more meaningful with this later
      },
      err => console.error(err),
      () => {
        console.log("Done Uploading");
      }
    );
  }

  onSubmit() {
    this.uploadSession();
  }

  clearInput() {
    this.model = {
      name: "",
      record_date: "",
      session_type: "",
      file: ""
    };
  }

  // TODO: Remove this when we're done
  get diagnostic() {
    return JSON.stringify(this.model);
  }
}
