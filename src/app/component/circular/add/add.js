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
var circular_service_1 = require("../../../providers/circular.service");
var common_service_1 = require("../../../providers/common.service");
var common_1 = require("@angular/common");
var AddCircular = (function () {
    function AddCircular(circserv, commonService, _location) {
        this.circserv = circserv;
        this.commonService = commonService;
        this._location = _location;
        this.title = 'Add Circular';
        this.submitProgress = false;
        this.stdIds = [];
    }
    AddCircular.prototype.ngOnInit = function () {
        this.circular = this.initForm();
    };
    AddCircular.prototype.onDueDate = function (e) {
        if (new Date(e.target.value) < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) {
            alert("Please choose an upcoming date from the calendar.");
            this.circular.controls['date'].patchValue(this.commonService.getTomorrow());
        }
    };
    AddCircular.prototype.ngAfterViewInit = function () {
        this.getCircularInfo();
        this.getStandards();
    };
    AddCircular.prototype.initForm = function () {
        return new forms_1.FormGroup({
            title: new forms_1.FormControl('', [forms_1.Validators.required]),
            description: new forms_1.FormControl('', [forms_1.Validators.required]),
            date: new forms_1.FormControl(this.commonService.getTomorrow(), [forms_1.Validators.required]),
            circularTypeId: new forms_1.FormControl('', []),
            file: new forms_1.FormControl('')
            // standardIds: new FormControl([], [Validators.required])
        });
    };
    AddCircular.prototype.getStandards = function () {
        this.standards = this.commonService.getData("standards");
        if (typeof (this.standards) === 'undefined') {
            this._getStandards();
        }
    };
    AddCircular.prototype._getStandards = function () {
        var _this = this;
        this.circserv.getStandards().subscribe(function (res) {
            _this.standards = res;
            _this.commonService.storeData("standards", res);
        }, function (err) {
        });
    };
    AddCircular.prototype.getCircularInfo = function () {
        var circularInfo = this.commonService.getData("circularInfo");
        if (typeof (circularInfo) == "undefined") {
            this._getCircularInfo();
        }
        else {
            this.buildCircularData(circularInfo);
        }
    };
    AddCircular.prototype._getCircularInfo = function () {
        var _this = this;
        this.commonService.getCircularInfo().subscribe(function (res) {
            _this.buildCircularData(res);
            _this.commonService.storeData("circularInfo", res);
        }, function (err) {
        });
    };
    AddCircular.prototype.buildCircularData = function (circular) {
        this.circularType = circular;
    };
    AddCircular.prototype.onCircularType = function (event) {
        if (event == "1") {
            this.circular.removeControl("standardIds");
            this.standard = [];
        }
        else if (event == "2") {
            this.circular.addControl("standardIds", new forms_1.FormControl('', [forms_1.Validators.required]));
        }
        // this.circular.controls['standardIds'].reset();
    };
    AddCircular.prototype.circularSubmit = function () {
        this.submitProgress = true;
        var formData = new FormData();
        console.log('circular', this.circular.value);
        console.log('file', this.file);
        formData.append('title', this.circular.value['title']);
        formData.append('description', this.circular.value['description']);
        formData.append('circularTypeId', this.circular.value['circularTypeId']);
        formData.append('date', this.circular.value['date']);
        formData.append('file', this.file);
        this.onSubmit(formData);
        this.submitProgress = false;
    };
    AddCircular.prototype.selectStandards = function (e) {
        var _this = this;
        this.stdIds = [];
        e.forEach(function (element) {
            _this.stdIds.push(element.id);
        });
        this.circular.controls['standardIds'].patchValue(this.stdIds);
    };
    AddCircular.prototype.onSubmit = function (formData) {
        var _this = this;
        console.log(formData);
        this.circserv.PostCircular(formData).subscribe(function (data) {
            _this.submitProgress = false;
            _this.circular = _this.initForm();
            $('#circularModal').modal('show');
        }, function (err) {
            console.log("err", err);
        });
    };
    AddCircular.prototype.getFile = function (event) {
        this.file = event.srcElement.files[0];
        console.log("file", this.file);
    };
    return AddCircular;
}());
AddCircular = __decorate([
    core_1.Component({
        selector: 'add-circular',
        templateUrl: './add.html'
    }),
    __metadata("design:paramtypes", [circular_service_1.CircularService,
        common_service_1.CommonService,
        common_1.Location])
], AddCircular);
exports.AddCircular = AddCircular;
//# sourceMappingURL=add.js.map