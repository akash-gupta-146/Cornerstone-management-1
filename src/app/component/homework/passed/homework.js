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
var homework_service_1 = require("../../../providers/homework.service");
// import { CustomService } from '../../../providers/custom.service';
var PassedHomework = (function () {
    function PassedHomework(homeworkService) {
        this.homeworkService = homeworkService;
        this.title = 'Homework';
        this.icon = "book";
        this.EmptyHomeworks = false;
        this.homeworks = [];
        this.currentPage = 1;
        this.loader = false;
        this.monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        this.noMore = false;
    }
    PassedHomework.prototype.ngOnInit = function () {
        this.getHomeworks();
    };
    PassedHomework.prototype.getHomeworks = function () {
        var _this = this;
        // this.nl.showLoader();
        this.loader = true;
        this.homeworkService.getOldHomework(this.currentPage).subscribe(function (data) {
            _this.onSuccess(data);
        }, function (err) {
            // this.nl.hideLoader();
        });
    };
    PassedHomework.prototype.previousHomework = function () {
        delete this.homeworks;
        this.currentPage -= 1;
        this.getHomeworks();
    };
    PassedHomework.prototype.nextHomework = function () {
        delete this.homeworks;
        this.currentPage += 1;
        this.getHomeworks();
    };
    PassedHomework.prototype.doRefresh = function (refresher) {
        var _this = this;
        setTimeout(function () {
            _this.homeworkService.getOldHomework(1).subscribe(function (res) {
                _this.onSuccess(res);
                refresher.complete();
            }, function (err) {
                refresher.complete();
                _this.onError(err);
            });
        }, 500);
    };
    PassedHomework.prototype.onSuccess = function (res) {
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
    PassedHomework.prototype.onError = function (err) {
        // this.nl.onError(err);
    };
    PassedHomework.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        this.currentPage += 1;
        setTimeout(function () {
            _this.loadMoreData(infiniteScroll);
        }, 500);
    };
    PassedHomework.prototype.loadMoreData = function (infiniteScroll) {
        var _this = this;
        this.homeworkService.getOldHomework(this.currentPage).subscribe(function (res) {
            infiniteScroll.complete();
            _this.loadDataSuccess(res);
        }, function (err) {
            infiniteScroll.complete();
            _this.loadDataError(err);
        });
    };
    PassedHomework.prototype.loadDataSuccess = function (res) {
        var _this = this;
        if (res.status === 204) {
            this.currentPage -= 1;
            return;
        }
        var newHomework = res;
        newHomework.forEach(function (data) {
            data.dueMonth = _this.monthNames[(new Date(data.dueDate)).getMonth()];
            data.dueDate = ("0" + (new Date(data.dueDate).getDate())).slice(-2);
        });
        this.homeworks = this.homeworks.concat(newHomework);
    };
    PassedHomework.prototype.loadDataError = function (err) {
        this.currentPage -= 1;
        // this.nl.onError(err);
    };
    return PassedHomework;
}());
PassedHomework = __decorate([
    core_1.Component({
        selector: 'passed-homework',
        // styleUrls:['../homework.component.css'],
        templateUrl: './homework.html'
    }),
    __metadata("design:paramtypes", [homework_service_1.HomeworkService])
], PassedHomework);
exports.PassedHomework = PassedHomework;
//# sourceMappingURL=homework.js.map