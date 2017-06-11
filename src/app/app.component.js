"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var circular_component_1 = require("./component/circular/circular.component");
var complaint_component_1 = require("./component/complaint/complaint.component");
var dashboard_component_1 = require("./component/dashboard/dashboard.component");
var homework_component_1 = require("./component/homework/homework.component");
var login_gaurd_1 = require("./component/login/login.gaurd");
var AppComponent = (function () {
    function AppComponent(log) {
        this.log = log;
        this.isLoggedIn = false;
        this.pages = [
            { title: 'Dashboard', component: dashboard_component_1.DashboardComponent, icon: 'icons/dashboard.png', url: 'dashboard' },
            { title: 'Complaints', component: complaint_component_1.ComplaintComponent, icon: 'icons/complaint.png', url: 'complaint' },
            { title: 'Circular', component: circular_component_1.CircularComponent, icon: 'icons/circular.png', url: 'circular' },
            { title: 'Homework', component: homework_component_1.HomeworkComponent, icon: 'icons/homework.png', url: 'homework/current-homework' }
        ];
        console.log("name", log.getData('username'));
    }
    AppComponent.prototype.ngOnInit = function () {
        if (this.log.isLoggedIn())
            this.isLoggedIn = true;
        else
            this.isLoggedIn = false;
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        $("#wrapper").toggleClass("toggled");
        $("#menu-toggle").click(function (e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
        });
    };
    AppComponent.prototype.logout = function () {
        localStorage.clear();
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: "./app.component.html",
        styleUrls: ["./app.component.css"]
    }),
    __metadata("design:paramtypes", [login_gaurd_1.LoggedInGuard])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map