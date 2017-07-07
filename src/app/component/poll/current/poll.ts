import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { CommonService } from '../../../providers/common.service';
import { PollService } from '../../../providers/poll.service';

declare let $: any;

@Component({
  selector: 'current-poll',
  templateUrl: './poll.html',
  styleUrls: ['./poll.css'],
})

export class CurrentPollComponent {

  public polls: any;
  public date: any;
  public currentPage=1;
  public noMore:boolean = false;
  public loader: boolean = false;
  public emptyPolls:boolean = false;
  constructor(public ps: PollService) {

    this.getPolls();
  }

  public getPolls() {
     this.loader = true;
    this.ps.getPolls(this.currentPage).subscribe((res) => {
     
      if (res.status == 204) {
        this.polls = [];
         this.loader=false;
        this.emptyPolls = true;        
        return;
      }
      this.polls = res;
      this.loader=false;
      console.log("polls",res);
      if(this.polls.length < 6) this.noMore = true;
      else this.noMore = false;
    },
      err => {
        console.log("err", err);
         this.loader=false;
      });
  }

  public changeDate(obj: any) {
    var day, mon, yr, date;
    day = (obj.expiredAt).slice(8, 10);
    mon = (obj.expiredAt + 1).slice(5, 7);
    yr = (obj.expiredAt + 1).slice(0, 4);
    date = day + '/' + mon + '/' + yr;
    return date;
  }

   public previousPoll() {
    delete this.polls;
    this.currentPage -= 1;
    this.getPolls();
  }

  public nextPoll() {
    delete this.polls;
    this.currentPage += 1;
    this.getPolls();
  }


}