// ANGULAR MODULES
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule, Routes } from "@angular/router";

// COMPONENTS
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from "./components/home/home.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { AboutComponent } from "./components/about/about.component";
import { AllSessionsComponent } from "./components/all-sessions/all-sessions.component";
import { EditSessionComponent } from "./components/edit-session/edit-session.component";
import { SessionDetailsComponent } from "./components/session-details/session-details.component";
import { UploadSessionComponent } from "./components/upload-session/upload-session.component";

// SERVICES
import { ValidateService } from "./services/validate.service";
import { AuthService } from "./services/auth.service";
import { DataService } from "./services/data.service";
import { AuthGuard } from "./guards/auth.guard"; // NOT A REAL SERVICE

// EXTERNAL DEPENDENCIES
import { NgFlashMessagesModule } from "ng-flash-messages";
import { JwtModule } from "@auth0/angular-jwt";
import { ChartsModule } from "ng2-charts";

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "about", component: AboutComponent },
  { path: "sessions", component: AllSessionsComponent },
  { path: "sessions/details/:_id", component: SessionDetailsComponent },
  { path: "sessions/edit/:_id", component: EditSessionComponent },
  { path: "sessions/upload", component: UploadSessionComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    AboutComponent,
    AllSessionsComponent,
    EditSessionComponent,
    SessionDetailsComponent,
    UploadSessionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    NgFlashMessagesModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    ChartsModule
  ],
  providers: [ValidateService, AuthService, DataService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function tokenGetter() {
  return localStorage.getItem("id_token");
}
