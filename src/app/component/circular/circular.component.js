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
var circular_service_1 = require("../../providers/circular.service");
var CircularComponent = (function () {
    function CircularComponent(circularService) {
        this.circularService = circularService;
        this.title = 'Circular';
        this.icon = "ios-paper-outline";
        this.currentPage = 1;
        this.EmptyCirculars = false;
        this.loader = false;
    }
    CircularComponent.prototype.ngOnInit = function () {
        this.fileUrl = localStorage.getItem("fileUrl") + "/";
        this.getCirculars();
    };
    CircularComponent.prototype.getCirculars = function () {
        var _this = this;
        this.loader = true;
        this.circularService.GetCirculars(this.currentPage).subscribe(function (res) {
            console.log(res);
            _this.onSuccess(res);
        }, function (err) {
            _this.onError(err);
        });
    };
    CircularComponent.prototype.onSuccess = function (data) {
        this.loader = false;
        if (data.status === 204) {
            this.EmptyCirculars = true;
        }
        else {
            this.circulars = data;
            if (this.circulars.length < 10)
                this.noMore = true;
            else
                this.noMore = false;
            this.EmptyCirculars = false;
        }
    };
    CircularComponent.prototype.onError = function (err) {
    };
    CircularComponent.prototype.previousCircular = function () {
        delete this.circulars;
        this.currentPage -= 1;
        this.getCirculars();
    };
    CircularComponent.prototype.nextCircular = function () {
        delete this.circulars;
        this.currentPage += 1;
        this.getCirculars();
    };
    // public onCircularSelected(circular) {
    //   this.circularService.GetparticularCircular(circular.id).subscribe((res) => {
    //   }, (err) => {
    //   })
    // }
    CircularComponent.prototype.seletToExpand = function (circular) {
        this.selectedCircular = circular;
    };
    return CircularComponent;
}());
CircularComponent = __decorate([
    core_1.Component({
        selector: 'circular',
        templateUrl: './circular.component.html',
        styleUrls: ['./circular.component.css']
    }),
    __metadata("design:paramtypes", [circular_service_1.CircularService])
], CircularComponent);
exports.CircularComponent = CircularComponent;
//# sourceMappingURL=circular.component.js.map