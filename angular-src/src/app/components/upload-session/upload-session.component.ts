import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { DataService } from "../../services/data.service";
import { ActivatedRoute, Router } from "@angular/router";

import { Session } from "../../entity/Session";

@Component({
  selector: "app-upload-session",
  templateUrl: "./upload-session.component.html",
  styleUrls: ["./upload-session.component.css"]
})
export class UploadSessionComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;

  @ViewChild("fileInput")
  fileInput: ElementRef;

  submitted = false;
  session_type_options = [
    "Development/Testing",
    "Practice",
    "Race",
    "Recreation",
    "Other"
  ];

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: ["", Validators.required],
      record_date: ["", Validators.required],
      session_type: ["", Validators.required],
      file: null
    });
  }

  onFileChange(event) {
    console.log("onFileChange");

    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.form.get("file").setValue(file);
    }
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append("name", this.form.get("name").value);
    input.append("record_date", this.form.get("record_date").value);
    input.append("session_type", this.form.get("session_type").value);
    input.append("file", this.form.get("file").value);
    return input;
  }

  onSubmit() {
    const formModel = this.prepareSave();
    this.loading = true;

    this.dataService.uploadSession(formModel).subscribe(
      res => {
        console.log(res); // Need to do something more meaningful with this later
      },
      err => console.error(err),
      () => {
        console.log("Done Sending File");
        this.loading = false;
        this.router.navigateByUrl("/sessions");
      }
    );
  }

  clearFile() {
    this.form.get("file").setValue(null);
    this.fileInput.nativeElement.value = "";
  }
}
