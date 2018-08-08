import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { ValidateService } from "../../services/validate.service";
import { AuthService } from "../../services/auth.service";

import { NgFlashMessageService } from "ng-flash-messages";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private ngFlashMessageService: NgFlashMessageService,
    private router: Router
  ) {}

  ngOnInit() {}

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };

    // Required Fields
    if (!this.validateService.validateLogin(user)) {
      this.ngFlashMessageService.showFlashMessage({
        messages: ["Please Enter a Valid Username and Password"],
        dismissible: true,
        timeout: 3000,
        type: "danger"
      });
      return false;
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.ngFlashMessageService.showFlashMessage({
          messages: ["You Are Now Logged In"],
          dismissible: true,
          timeout: 5000,
          type: "success"
        });
        this.router.navigate(["/dashboard"]);
      } else {
        this.ngFlashMessageService.showFlashMessage({
          messages: [data.message],
          dismissible: true,
          timeout: 5000,
          type: "danger"
        });
        this.router.navigate(["/login"]);
      }
    });
  }
}
