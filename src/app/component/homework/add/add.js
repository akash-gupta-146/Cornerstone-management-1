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
var forms_1 = require("@angular/forms");
var homework_service_1 = require("../../../providers/homework.service");
var common_1 = require("@angular/common");
var common_service_1 = require("../../../providers/common.service");
var HomeworkAddComponent = (function () {
    function HomeworkAddComponent(homeworkService, commonService, _location) {
        this.homeworkService = homeworkService;
        this.commonService = commonService;
        this._location = _location;
        this.title = "New Homework";
        this.submitProgress = false;
        this.standards = [];
        this.subjects = [];
    }
    HomeworkAddComponent.prototype.ngOnInit = function () {
        this.initForm();
        this.getStandards();
    };
    HomeworkAddComponent.prototype.getFile = function (event) {
        this.file = event.srcElement.files[0];
    };
    HomeworkAddComponent.prototype.onDueDate = function (e) {
        if (new Date(e.target.value) < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) {
            alert("Please choose an upcoming date from the calendar.");
            this.homework.controls['dueDate'].patchValue(this.commonService.getTomorrow());
        }
    };
    HomeworkAddComponent.prototype.initForm = function () {
        this.homework = new forms_1.FormGroup({
            description: new forms_1.FormControl('', [forms_1.Validators.required]),
            standardId: new forms_1.FormControl('', [forms_1.Validators.required]),
            subjectId: new forms_1.FormControl('', [forms_1.Validators.required]),
            dueDate: new forms_1.FormControl(this.commonService.getTomorrow(), [forms_1.Validators.required]),
            file: new forms_1.FormControl('')
        });
    };
    HomeworkAddComponent.prototype.getSubjects = function (a) {
        var _this = this;
        // this.nl.showLoader();
        this.homeworkService.getSubjects(a).subscribe(function (data) {
            // this.nl.hideLoader();
            _this.subjects = data;
        }, function (err) {
            // this.nl.onError(err);
            // this.viewCtrl.dismiss();
        });
    };
    HomeworkAddComponent.prototype.getStandards = function () {
        this.standards = this.commonService.getData("standards");
        if (typeof (this.standards) === 'undefined') {
            this._getStandards();
        }
    };
    HomeworkAddComponent.prototype._getStandards = function () {
        var _this = this;
        // this.nl.showLoader();
        this.homeworkService.getStandards().subscribe(function (res) {
            // this.nl.hideLoader();
            _this.standards = res;
            _this.commonService.storeData("standards", res);
        }, function (err) {
            // this.viewCtrl.dismiss();
            // this.nl.onError(err);
        });
    };
    HomeworkAddComponent.prototype.submitHomework = function () {
        this.submitProgress = true;
        var formData = new FormData();
        formData.append('description', this.homework.value['description']);
        formData.append('standardId', this.homework.value['standardId']);
        formData.append('subjectId', this.homework.value['subjectId']);
        formData.append('dueDate', this.homework.value['dueDate']);
        formData.append('file', this.file);
        this.saveHomework(formData);
        this.submitProgress = false;
    };
    // public presentActionSheet() {
    //   let actionSheet = this.actionSheetCtrl.create({
    //     title: 'Are you sure you want to submit?',
    //     buttons: [{
    //       text: 'YES',
    //       role: 'submit',
    //       handler: () => {
    //         this.saveHomework();
    //       }
    //     }, {
    //       text: 'CANCEL',
    //       role: 'cancel',
    //       handler: () => {
    //         console.log('Cancel clicked');
    //       }
    //     }]
    //   });
    //   actionSheet.present();
    // }
    HomeworkAddComponent.prototype.saveHomework = function (formData) {
        var _this = this;
        // this.nl.showLoader();
        this.homeworkService.PostHomework(formData).subscribe(function (data) {
            $('#homeworkModal').modal('show');
            _this.initForm();
            // this.nl.hideLoader();
            // this.viewCtrl.dismiss(data);
            // this.nl.showToast("Homework created successfully");
        }, function (err) {
            // this.nl.onError(err);
            // this.viewCtrl.dismiss();
        });
    };
    return HomeworkAddComponent;
}());
HomeworkAddComponent = __decorate([
    core_1.Component({
        selector: 'homework-add',
        templateUrl: './add.html',
    }),
    __metadata("design:paramtypes", [homework_service_1.HomeworkService,
        common_service_1.CommonService,
        common_1.Location])
], HomeworkAddComponent);
exports.HomeworkAddComponent = HomeworkAddComponent;
//# sourceMappingURL=add.js.map