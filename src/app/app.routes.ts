import { Routes } from '@angular/router';

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
import { MainComponent } from './component/main/main.component';
import { AccountComponent } from './component/account/account.component';


import { LoggedInGuard } from './component/login/login.gaurd';
export const rootRouterConfig: Routes = [
  { path: '', redirectTo : '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '', component:MainComponent, canActivate: [LoggedInGuard],
  children:[
    { path: 'forgot-password', component: ForgotPassword},
    { path: 'dashboard', component: DashboardComponent, canActivate: [LoggedInGuard] },
    { path: 'complaint', component: ComplaintComponent, canActivate: [LoggedInGuard] },
    { path: 'complaint/status/:statusId', component: ComplaintComponent, canActivate: [LoggedInGuard] },
    { path: 'complaint/category-status/category/:categoryId', component: ComplaintComponent, canActivate: [LoggedInGuard] },
    { path: 'complaint/category-status/:categoryId/:statusId', component: ComplaintComponent, canActivate: [LoggedInGuard] },
    { path: 'circular', component: CircularComponent, canActivate: [LoggedInGuard] },
    { path: 'add-circular', component:AddCircular, canActivate:[LoggedInGuard]},
      { path: 'homework', component: HomeworkComponent, canActivate: [LoggedInGuard],
      children:[      
        { path: 'current-homework', component:CurrentHomework, canActivate: [LoggedInGuard]},
        { path:'passed-homework', component:PassedHomework, canActivate: [LoggedInGuard]}
      ]
    },
    { path:'homework-add', component:HomeworkAddComponent, canActivate: [LoggedInGuard]},
    { path: 'account', component: AccountComponent}
  ]},
];