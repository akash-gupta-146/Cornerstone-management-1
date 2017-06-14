import { NgModule }      from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { rootRouterConfig } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { MainComponent } from './component/main/main.component';
import { LoginComponent } from './component/login/login.component';
import { ForgotPassword } from './component/login/forgot.password';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ComplaintComponent } from './component/complaint/complaint.component';
import { CircularComponent } from './component/circular/circular.component';
import { AddCircular } from './component/circular/add/add';
import { HomeworkComponent } from './component/homework/homework.component';
import { HomeworkAddComponent } from './component/homework/add/add';
import { CurrentHomework } from './component/homework/current/homework';
import { PassedHomework } from './component/homework/passed/homework';
import { GoogleChart } from './customComponent/chart.directive';
import { CustomLoader } from './customComponent/loader.component';
import { AccountComponent } from './component/account/account.component';

/*Providers */
import { LoggedInGuard } from './component/login/login.gaurd';
import { CustomHttpService } from './providers/default.header.service';
import { CommonService } from './providers/common.service';
import { Configuration } from './providers/app.constant';
import { AuthService } from './providers/auth.service';
import { ComplaintService } from './providers/complaint.service';
import { HomeworkService } from './providers/homework.service';
import { ChartService } from './providers/chart.service';
import { CircularService } from './providers/circular.service';
import {XHRBackend, RequestOptions} from '@angular/http';
@NgModule({
  imports: [
    BrowserModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
    RouterModule.forRoot(rootRouterConfig, { useHash: true })
  ],
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    ForgotPassword,
    DashboardComponent,
    ComplaintComponent,
    CircularComponent,
    AddCircular,
    HomeworkComponent,
    HomeworkAddComponent,
    CurrentHomework,
    PassedHomework,
    GoogleChart,
    CustomLoader,
    AccountComponent,
  ],
  providers: [LoggedInGuard,Configuration,CommonService,CustomHttpService,AuthService,ComplaintService,ChartService,
              HomeworkService,CircularService,
  {
      provide: CustomHttpService,
      useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => {
        return new CustomHttpService(backend, defaultOptions);
      },
      deps: [XHRBackend, RequestOptions]
  }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
