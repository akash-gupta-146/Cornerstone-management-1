"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var login_component_1 = require("./component/login/login.component");
var forgot_password_1 = require("./component/login/forgot.password");
var dashboard_component_1 = require("./component/dashboard/dashboard.component");
var complaint_component_1 = require("./component/complaint/complaint.component");
var circular_component_1 = require("./component/circular/circular.component");
var add_1 = require("./component/circular/add/add");
var homework_component_1 = require("./component/homework/homework.component");
var add_2 = require("./component/homework/add/add");
var homework_1 = require("./component/homework/current/homework");
var homework_2 = require("./component/homework/passed/homework");
var main_component_1 = require("./component/main/main.component");
var login_gaurd_1 = require("./component/login/login.gaurd");
exports.rootRouterConfig = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: '', component: main_component_1.MainComponent, canActivate: [login_gaurd_1.LoggedInGuard],
        children: [
            { path: 'forgot-password', component: forgot_password_1.ForgotPassword },
            { path: 'dashboard', component: dashboard_component_1.DashboardComponent, canActivate: [login_gaurd_1.LoggedInGuard] },
            { path: 'complaint', component: complaint_component_1.ComplaintComponent, canActivate: [login_gaurd_1.LoggedInGuard] },
            { path: 'complaint/status/:statusId', component: complaint_component_1.ComplaintComponent, canActivate: [login_gaurd_1.LoggedInGuard] },
            { path: 'complaint/category-status/category/:categoryId', component: complaint_component_1.ComplaintComponent, canActivate: [login_gaurd_1.LoggedInGuard] },
            { path: 'complaint/category-status/:categoryId/:statusId', component: complaint_component_1.ComplaintComponent, canActivate: [login_gaurd_1.LoggedInGuard] },
            { path: 'circular', component: circular_component_1.CircularComponent, canActivate: [login_gaurd_1.LoggedInGuard] },
            { path: 'add-circular', component: add_1.AddCircular, canActivate: [login_gaurd_1.LoggedInGuard] },
            { path: 'homework', component: homework_component_1.HomeworkComponent, canActivate: [login_gaurd_1.LoggedInGuard],
                children: [
                    { path: 'current-homework', component: homework_1.CurrentHomework, canActivate: [login_gaurd_1.LoggedInGuard] },
                    { path: 'passed-homework', component: homework_2.PassedHomework, canActivate: [login_gaurd_1.LoggedInGuard] }
                ]
            },
            { path: 'homework-add', component: add_2.HomeworkAddComponent, canActivate: [login_gaurd_1.LoggedInGuard] },
        ] },
];
//# sourceMappingURL=app.routes.js.map