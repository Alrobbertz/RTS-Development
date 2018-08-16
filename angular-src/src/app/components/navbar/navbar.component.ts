import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { ValidateService } from "../../services/validate.service";
import { AuthService } from "../../services/auth.service";

import { NgFlashMessageService } from "ng-flash-messages";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private ngFlashMessageService: NgFlashMessageService,
    private router: Router
  ) {}
  ngOnInit() {}

  onLogoutClick() {
    this.authService.logout();
    this.ngFlashMessageService.showFlashMessage({
      messages: ["You are Logged Out"],
      dismissible: true,
      timeout: 3000,
      type: "info"
    });
    this.router.navigateByUrl("/");
    return false;
  }
}
