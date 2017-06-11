import {Component, AfterViewInit,OnInit} from '@angular/core';
import { CircularComponent } from './component/circular/circular.component';
import { ComplaintComponent } from './component/complaint/complaint.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HomeworkComponent } from './component/homework/homework.component';
import { LoggedInGuard } from './component/login/login.gaurd';


@Component({
  selector: 'my-app',
  templateUrl:"./app.component.html",
  styleUrls:["./app.component.css"]
})
export class AppComponent implements OnInit, AfterViewInit{

  public user:any;
  public isLoggedIn:boolean = false;
  public pages = [
      { title: 'Dashboard', component: DashboardComponent, icon: 'icons/dashboard.png', url: 'dashboard' },
      { title: 'Complaints', component: ComplaintComponent, icon: 'icons/complaint.png', url: 'complaint' },
      { title: 'Circular', component: CircularComponent , icon: 'icons/circular.png', url: 'circular'},
      { title: 'Homework', component: HomeworkComponent, icon: 'icons/homework.png', url: 'homework/current-homework' }
    ];

  constructor(public log:LoggedInGuard){
    console.log("name",log.getData('username'));
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
