"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var app_routes_1 = require("./app.routes");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var main_component_1 = require("./component/main/main.component");
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
var chart_directive_1 = require("./customComponent/chart.directive");
var loader_component_1 = require("./customComponent/loader.component");
var account_component_1 = require("./component/account/account.component");
/*Providers */
var login_gaurd_1 = require("./component/login/login.gaurd");
var default_header_service_1 = require("./providers/default.header.service");
var common_service_1 = require("./providers/common.service");
var app_constant_1 = require("./providers/app.constant");
var auth_service_1 = require("./providers/auth.service");
var complaint_service_1 = require("./providers/complaint.service");
var homework_service_1 = require("./providers/homework.service");
var chart_service_1 = require("./providers/chart.service");
var circular_service_1 = require("./providers/circular.service");
var http_2 = require("@angular/http");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            platform_browser_1.BrowserModule,
            forms_1.ReactiveFormsModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            router_1.RouterModule.forRoot(app_routes_1.rootRouterConfig, { useHash: true })
        ],
        declarations: [
            app_component_1.AppComponent,
            main_component_1.MainComponent,
            login_component_1.LoginComponent,
            forgot_password_1.ForgotPassword,
            dashboard_component_1.DashboardComponent,
            complaint_component_1.ComplaintComponent,
            circular_component_1.CircularComponent,
            add_1.AddCircular,
            homework_component_1.HomeworkComponent,
            add_2.HomeworkAddComponent,
            homework_1.CurrentHomework,
            homework_2.PassedHomework,
            chart_directive_1.GoogleChart,
            loader_component_1.CustomLoader,
            account_component_1.AccountComponent,
        ],
        providers: [login_gaurd_1.LoggedInGuard, app_constant_1.Configuration, common_service_1.CommonService, default_header_service_1.CustomHttpService, auth_service_1.AuthService, complaint_service_1.ComplaintService, chart_service_1.ChartService,
            homework_service_1.HomeworkService, circular_service_1.CircularService,
            {
                provide: default_header_service_1.CustomHttpService,
                useFactory: function (backend, defaultOptions) {
                    return new default_header_service_1.CustomHttpService(backend, defaultOptions);
                },
                deps: [http_2.XHRBackend, http_2.RequestOptions]
            }],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map