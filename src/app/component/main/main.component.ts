import {Component, AfterViewInit,OnInit} from '@angular/core';
import { CircularComponent } from '../circular/circular.component';
import { ComplaintComponent } from '../complaint/complaint.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HomeworkComponent } from '../homework/homework.component';
import { LoggedInGuard } from '../login/login.gaurd';
import {AppreciationComponent} from '../appreciation/appreciation.component';
import {PollComponent} from '../poll/poll.component';
import {MessageComponent} from '../message/message.component';
import {EventComponent} from '../event/event.component';

declare let $:any;

@Component({
  selector:'main',
  templateUrl:"./main.component.html",
  styleUrls:['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit{

  public user:any;
  public isLoggedIn:boolean = false;
  public pages = [
      { title: 'Dashboard', component: DashboardComponent, icon: 'icons/dashboard.png', url: '/dashboard' },
      { title: 'Complaints', component: ComplaintComponent, icon: 'icons/complaint.png', url: '/complaint' },
      { title: 'Circular', component: CircularComponent , icon: 'icons/circular.png', url: '/circular'},
      { title: 'Homework', component: HomeworkComponent, icon: 'icons/homework.png', url: '/homework/current-homework' },
      { title: 'Appreciation', component: AppreciationComponent, icon: 'icons/appreciation.png', url: '/appreciation/for-me' },
      { title: 'Poll', component: PollComponent, icon: 'icons/poll.png', url: '/poll/current-poll'},
      { title: 'Message', component: MessageComponent, icon: 'icons/message.png', url: '/messaging'},
      { title: 'Events', component: EventComponent, icon: 'icons/event.png', url: '/event'}
      
    ];

  constructor(public log:LoggedInGuard){
  }

  ngOnInit(){
    if(this.log.isLoggedIn()) this.isLoggedIn = true;
    else this.isLoggedIn = false;
  }

  ngAfterViewInit(){
    $("#wrapper").toggleClass("toggled");
    $("#menu-toggle").click(function(e:any) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
  }
  logout(){
    localStorage.clear();
  }
}