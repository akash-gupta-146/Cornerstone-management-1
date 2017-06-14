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
// import { HomeworkAddComponent } from '../add/add';
var homework_service_1 = require("../../../providers/homework.service");
// import { CustomService } from '../../../providers/custom.service';
var CurrentHomework = (function () {
    function CurrentHomework(homeworkService) {
        this.homeworkService = homeworkService;
        this.fileUrl = localStorage.getItem("fileUrl") + "/";
        this.title = "Homework";
        this.icon = "book";
        this.currentPage = 1;
        this.homeworks = [];
        this.loader = false;
        this.EmptyHomeworks = false;
        this.monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        this.noMore = false;
    }
    CurrentHomework.prototype.ngOnInit = function () {
        this.getHomeworks();
    };
    CurrentHomework.prototype.getHomeworks = function () {
        var _this = this;
        // this.nl.showLoader();
        this.loader = true;
        this.homeworkService.getHomework(this.currentPage).subscribe(function (data) {
            _this.onSuccess(data);
        }, function (err) {
            // this.nl.hideLoader();
        });
    };
    CurrentHomework.prototype.onSuccess = function (res) {
        var _this = this;
        // this.nl.hideLoader();
        this.loader = false;
        if (res.status === 204) {
            this.EmptyHomeworks = true;
        }
        else {
            this.EmptyHomeworks = false;
            this.homeworks = res;
            if (this.homeworks.length < 10)
                this.noMore = true;
            else
                this.noMore = false;
            this.homeworks.forEach(function (data) {
                data.dueMonth = _this.monthNames[(new Date(data.dueDate)).getMonth()];
                data.dueDate = ("0" + (new Date(data.dueDate).getDate())).slice(-2);
            });
        }
    };
    CurrentHomework.prototype.onError = function (err) {
        // this.nl.onError(err);
    };
    CurrentHomework.prototype.previousHomework = function () {
        delete this.homeworks;
        this.currentPage -= 1;
        this.getHomeworks();
    };
    CurrentHomework.prototype.nextHomework = function () {
        delete this.homeworks;
        this.currentPage += 1;
        this.getHomeworks();
    };
    return CurrentHomework;
}());
CurrentHomework = __decorate([
    core_1.Component({
        selector: 'current-homework',
        templateUrl: './homework.html',
    }),
    __metadata("design:paramtypes", [homework_service_1.HomeworkService])
], CurrentHomework);
exports.CurrentHomework = CurrentHomework;
//# sourceMappingURL=homework.js.map