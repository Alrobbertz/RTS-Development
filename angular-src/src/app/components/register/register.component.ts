import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { ValidateService } from "../../services/validate.service";
import { AuthService } from "../../services/auth.service";

import { NgFlashMessageService } from "ng-flash-messages";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private ngFlashMessageService: NgFlashMessageService,
    private router: Router
  ) {}

  ngOnInit() {}

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    };

    // Required Fields
    if (!this.validateService.validateRegister(user)) {
      console.log("Please fill in all fields");
      this.ngFlashMessageService.showFlashMessage({
        messages: ["Please Fill in All Fields"],
        dismissible: true,
        timeout: 3000,
        type: "danger"
      });
      return false;
    }

    // Validate Email
    if (!this.validateService.validateEmail(user.email)) {
      console.log("Please use a valid email");
      this.ngFlashMessageService.showFlashMessage({
        messages: ["Please Use a Valid email"],
        dismissible: true,
        timeout: 3000,
        type: "danger"
      });
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.ngFlashMessageService.showFlashMessage({
          messages: ["You are now registered! Login Now!"],
          dismissible: true,
          timeout: 3000,
          type: "success"
        });
        this.router.navigateByUrl("/login");
      } else {
        this.ngFlashMessageService.showFlashMessage({
          messages: ["Oops, Something Went Wrong"],
          dismissible: true,
          timeout: 3000,
          type: "danger"
        });
        this.router.navigateByUrl("/register");
      }
    });
  }
}
