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
var login_gaurd_1 = require("../login/login.gaurd");
var router_1 = require("@angular/router");
var common_service_1 = require("../../providers/common.service");
var forms_1 = require("@angular/forms");
var auth_service_1 = require("../../providers/auth.service");
var AccountComponent = (function () {
    function AccountComponent(lg, cs, au, router, route) {
        this.lg = lg;
        this.cs = cs;
        this.au = au;
        this.router = router;
        this.route = route;
        this.name = "";
        this.url = "";
        this.loader = false;
        this.url = this.router.url;
    }
    AccountComponent.prototype.ngOnInit = function () {
        this.loadAccountDetails(this.details);
        this.uploadPicForm = new forms_1.FormGroup({
            imgFile: new forms_1.FormControl("", [forms_1.Validators.required]),
        });
    };
    AccountComponent.prototype.loadAccountDetails = function (details) {
        this.name = this.lg.getData('name');
        this.nickName = this.lg.getData('nickName');
        this.role = this.lg.getData('role');
        this.email = this.lg.getData('email');
        this.picUrl = this.lg.getData('picUrl');
    };
    AccountComponent.prototype.getFile = function (event) {
        this.imgFile = event.srcElement.files[0];
        console.log(this.imgFile);
    };
    AccountComponent.prototype.submitAccountDetails = function (details) {
        var _this = this;
        this.loader = true;
        var formData = new FormData();
        formData.append('file', this.imgFile);
        this.au.uploadImage(formData).subscribe(function (res) {
            localStorage.setItem('picUrl', localStorage.getItem('fileUrl') + "/" + res.fileTimestamp);
            $('#myModal').modal('hide');
            _this.loader = false;
        });
    };
    return AccountComponent;
}());
AccountComponent = __decorate([
    core_1.Component({
        selector: 'my-account',
        templateUrl: './account.component.html',
        styleUrls: ['./account.component.css']
    }),
    __metadata("design:paramtypes", [login_gaurd_1.LoggedInGuard,
        common_service_1.CommonService,
        auth_service_1.AuthService,
        router_1.Router,
        router_1.ActivatedRoute])
], AccountComponent);
exports.AccountComponent = AccountComponent;
//# sourceMappingURL=account.component.js.map