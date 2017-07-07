import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CircularService } from '../../../providers/circular.service';
import { CommonService } from '../../../providers/common.service';
import { Location } from '@angular/common';

declare let $:any;

@Component({
  selector:'add-circular',
  templateUrl:'./add.html'
})
export class AddCircular implements OnInit, AfterViewInit{

  public circular: FormGroup;
  public title: string = 'Add Circular';
  public newCircular:any;
  public standards:any;
  public circularType:any;
  public file:any;
  public submitProgress:boolean = false;
  constructor(private circserv: CircularService,
              private commonService: CommonService,
              private _location:Location) { }

  ngOnInit() {
    this.circular = this.initForm();
  }
  
  onDueDate(e:any){
    if(new Date(e.target.value) < new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate())){
      alert("Please choose an upcoming date from the calendar.");
      this.circular.controls['date'].patchValue(this.commonService.getTomorrow());
    }
  }

  ngAfterViewInit() {
    this.getCircularInfo();
    this.getStandards();
  }

  public initForm() {
  return new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      date: new FormControl(this.commonService.getTomorrow(), [Validators.required]),
      circularTypeId: new FormControl('', [Validators.required]),
       file: new FormControl('')
      // standardIds: new FormControl([], [Validators.required])
    });
  }

  public getStandards() {
    this.standards = this.commonService.getData("standards");
    if (typeof(this.standards) === 'undefined') {
      this._getStandards();
    }
  }

  public _getStandards() {
    this.circserv.getStandards().subscribe((res) => {
      this.standards = res;
      this.commonService.storeData("standards", res);
    }, (err) => {

    });
  }

  public getCircularInfo() {
    let circularInfo = this.commonService.getData("circularInfo");
    if (typeof(circularInfo) == "undefined") {
      this._getCircularInfo();
    } else {
      this.buildCircularData(circularInfo);
    }
  }

  public _getCircularInfo() {
    this.commonService.getCircularInfo().subscribe((res) => {
      this.buildCircularData(res);
      this.commonService.storeData("circularInfo", res);
    }, (err) => {
    });
  }

  public buildCircularData(circular:any) {
    this.circularType = circular;
  }

  public onCircularType(event: any) {
    if (event == "1") {
      this.circular.removeControl("standardIds");
      this.standard = [];
    } else if (event == "2") {
      this.circular.addControl("standardIds", new FormControl('', [Validators.required]));
    }
    // this.circular.controls['standardIds'].reset();
  }

  public circularSubmit(){
    this.submitProgress = true;
       
    let formData = new FormData();
    console.log('circular',this.circular.value);
    console.log('file',this.file);
    formData.append('title',this.circular.value['title']);
    formData.append('description',this.circular.value['description']);
    formData.append('circularTypeId',this.circular.value['circularTypeId']);
    formData.append('date',this.circular.value['date']);
    formData.append('file', this.file);
    this.onSubmit(formData);
    this.submitProgress = false;
  }
  stdIds:any = [];
  standard:any;
  selectStandards(e:any){
    this.stdIds = [];
    e.forEach((element:any) => {
      this.stdIds.push(element.id);
    });
    this.circular.controls['standardIds'].patchValue(this.stdIds);
  }

  public onSubmit(formData: any) {
    console.log(formData);
    this.circserv.PostCircular(formData).subscribe((data) => {
      this.submitProgress = false;
      this.circular = this.initForm();
      $('#circularModal').modal('show');
    }, (err) => {

      console.log("err",err);

    });
  }
   
  getFile(event:any){
    this.file = event.srcElement.files[0];
    console.log("file",this.file);
  }

}