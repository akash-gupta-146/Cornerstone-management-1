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
var router_1 = require("@angular/router");
var complaint_service_1 = require("../../providers/complaint.service");
var forms_1 = require("@angular/forms");
var ComplaintComponent = (function () {
    function ComplaintComponent(cs, router, route) {
        var _this = this;
        this.cs = cs;
        this.router = router;
        this.route = route;
        this.EmptyComplaints = false;
        this.loader = false;
        this.currentPage = 1;
        this.complaint = {
            title: ""
        };
        this.url = "";
        this.status = "";
        this.noMore = false;
        this.closedOn = false;
        this.currentUser = this.cs.getUserId();
        this.url = this.router.url;
        this.route.params.subscribe(function (param) {
            if (param['statusId'])
                _this.complaintStatus = param['statusId'];
            if (param['categoryId'])
                _this.complaintCategory = param['categoryId'];
        });
        switch (this.complaintStatus) {
            case '1':
                this.status = "New";
                break;
            case '2':
                this.status = "Assigned";
                break;
            case '3':
                this.status = "InProgress";
                break;
            case '4':
                this.status = "Closed";
                break;
            case '5':
                this.status = "Reopen";
                break;
            case '6':
                this.status = "Satisfied";
                break;
            default:
                this.status = "All";
                break;
        }
    }
    ComplaintComponent.prototype.ngOnInit = function () {
        this.fileUrl = localStorage.getItem("fileUrl") + "/";
        this.fetchComplaints();
        this.getEditInfo();
        this.loadForm();
        this.commentForm = new forms_1.FormGroup({
            comment: new forms_1.FormControl("")
        });
        this.closeForm = new forms_1.FormGroup({
            rca: new forms_1.FormControl("", [forms_1.Validators.required]),
            comment: new forms_1.FormControl("", [forms_1.Validators.required])
        });
    };
    ComplaintComponent.prototype.getEditInfo = function () {
        var _this = this;
        this.cs.editInfo().subscribe(function (response) {
            _this.employees = response.employees;
            _this.priorities = response.priorities;
        }, function (error) {
            _this.employees = [];
            _this.priorities = [];
            console.log("error", error);
        });
    };
    ComplaintComponent.prototype.ngAfterViewInit = function () {
        $('.panel.panel-chat').hide();
        $(".panel.panel-chat > .panel-heading > .chatMinimize").click(function () {
            if ($(this).parent().parent().hasClass('mini')) {
                $(this).parent().parent().removeClass('mini').addClass('normal');
                $('.panel.panel-chat > .panel-body').animate({ height: "250px" }, 500).show();
                $('.panel.panel-chat > .panel-footer').animate({ height: "75px" }, 500).show();
            }
            else {
                $(this).parent().parent().removeClass('normal').addClass('mini');
                $('.panel.panel-chat > .panel-body').animate({ height: "0" }, 500);
                $('.panel.panel-chat > .panel-footer').animate({ height: "0" }, 500);
                setTimeout(function () {
                    $('.panel.panel-chat > .panel-body').hide();
                    $('.panel.panel-chat > .panel-footer').hide();
                }, 500);
            }
        });
        $(".panel.panel-chat > .panel-heading > .chatClose").click(function () {
            // $(this).parent().parent().remove();
            $(this).parent().parent().hide();
        });
    };
    ComplaintComponent.prototype.fetchComplaints = function () {
        var _this = this;
        this.loader = true;
        this.cs.getComplaint(this.url, this.currentPage).subscribe(function (res) {
            console.log(res);
            _this.onSuccess(res);
        }, function (err) {
            _this.onError(err);
        });
    };
    ComplaintComponent.prototype.onSuccess = function (res) {
        this.loader = false;
        if (res.status !== 204) {
            this.complaints = res;
            if (this.complaints.length < 10)
                this.noMore = true;
            else
                this.noMore = false;
            this.complaintsCOPY = res;
            this.EmptyComplaints = false;
        }
        else {
            this.EmptyComplaints = true;
        }
    };
    ComplaintComponent.prototype.onError = function (err) {
        this.complaints = [];
    };
    ComplaintComponent.prototype.selectComplaint = function (complaint, index) {
        this.selectedComplaint = complaint;
        this.selectedIndex = index;
        this.loadFormValue();
    };
    ComplaintComponent.prototype.seletToExpand = function (c) {
        this.selectedComplaint = c;
    };
    ComplaintComponent.prototype.updateComplaint = function () {
        var _this = this;
        console.log(this.editForm.value);
        if (this.editForm.value['statusId'])
            this.editForm.value['statusId'] = 3;
        else
            delete this.editForm.value['statusId'];
        // if(this.editForm.value['assignedTo'] == this.selectedComplaint.assignedEmployeeId)
        //   delete this.editForm.value['assignedTo'];
        // if(this.editForm.value['priorityId'] == this.selectedComplaint.priorityId)
        //   delete this.editForm.value['priorityId'];
        this.cs.updateComplaint(this.selectedComplaint.id, this.editForm.value).subscribe(function (response) {
            _this.complaints[_this.selectedIndex] = response;
            $('#myModal').modal('hide');
        }, function (error) {
            console.log("error", error);
        });
    };
    ComplaintComponent.prototype.loadForm = function () {
        this.editForm = new forms_1.FormGroup({
            assignedTo: new forms_1.FormControl(''),
            priorityId: new forms_1.FormControl(''),
            statusId: new forms_1.FormControl('')
        });
    };
    ComplaintComponent.prototype.loadFormValue = function () {
        this.editForm.patchValue({ "assignedTo": this.selectedComplaint.assignedEmployeeId });
        this.editForm.patchValue({ "priorityId": this.selectedComplaint.priorityId });
    };
    ComplaintComponent.prototype.closeComplaint = function () {
        var _this = this;
        this.cs.closeComplaint(this.selectedComplaint.id, this.closeForm.value).subscribe(function (response) {
            _this.complaints[_this.selectedIndex] = response;
            $('#myModal3').modal('hide');
        }, function (error) {
            console.log("error", error);
        });
    };
    ComplaintComponent.prototype.previousComplaint = function () {
        delete this.complaints;
        this.currentPage -= 1;
        this.fetchComplaints();
    };
    ComplaintComponent.prototype.nextComplaint = function () {
        delete this.complaints;
        this.currentPage += 1;
        this.fetchComplaints();
    };
    ComplaintComponent.prototype.loadComplaints = function () {
        this.complaints = this.complaintsCOPY;
    };
    ComplaintComponent.prototype.resetComplaints = function () {
        this.loadFormValue();
    };
    ComplaintComponent.prototype.searchComplaints = function (ev) {
        var _this = this;
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.loader = true;
            this.cs.searchComplaints(this.currentPage, { "search": val }).subscribe(function (res) {
                _this.loader = false;
                _this.complaints = res;
                if (res.status == 204) {
                    _this.complaints = [];
                    _this.loader = false;
                }
            }, function (error) {
                _this.loader = false;
                console.log("error", error);
            });
        }
        else {
            this.complaints = this.complaintsCOPY;
        }
    };
    ComplaintComponent.prototype.getComplaintCommentById = function (complaint) {
        var _this = this;
        if (complaint.closedOn || complaint.statusId == 6)
            this.closedOn = true;
        this.complaintIdOfCommentModel = complaint.id;
        this.complaints.forEach(function (element) {
            if (element['id'] == complaint.id)
                _this.complaintTitleOfCommentModel = element.title;
        });
        this.cs.getComplaintCommentById(this.url, complaint.id).subscribe(function (res) {
            if (res.status === 204) {
                _this.EmptyComments = true;
            }
            else {
                _this.EmptyComments = false;
                _this.comments = res;
                console.log("comments", _this.comments);
            }
        }, function (err) {
            delete _this.comments;
            _this.cs.showToast("Internal server error.. Try again later");
        });
    };
    ComplaintComponent.prototype.submitComment = function () {
        var _this = this;
        if (this.commentForm.value['comment'])
            this.cs.postComplaintComment(this.complaintIdOfCommentModel, this.commentForm.value).subscribe(function (res) {
                _this.commentForm.value['employeeId'] = _this.currentUser;
                _this.commentForm.value['createdAt'] = new Date();
                _this.comments.push(_this.commentForm.value);
                console.log("submited", res);
                _this.commentForm.reset();
            }, function (err) {
                _this.cs.showToast("Internal server error.. Try again later");
            });
    };
    ComplaintComponent.prototype.clearComment = function () {
        delete this.comments;
    };
    ComplaintComponent.prototype.openModal = function (complaint) {
        this.complaint = complaint;
        console.log(this.complaint);
        $('#modal1').modal('show');
    };
    return ComplaintComponent;
}());
ComplaintComponent = __decorate([
    core_1.Component({
        selector: 'complaint',
        templateUrl: './complaint.component.html',
        styleUrls: ['./complaint.component.css']
    }),
    __metadata("design:paramtypes", [complaint_service_1.ComplaintService,
        router_1.Router,
        router_1.ActivatedRoute])
], ComplaintComponent);
exports.ComplaintComponent = ComplaintComponent;
//# sourceMappingURL=complaint.component.js.map