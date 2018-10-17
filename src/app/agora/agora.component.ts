import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AgoraService } from '../agora.service';
import { MessageService } from '../message.service';
import { Eventmain } from '../eventmain';

@Component({
  selector: 'app-agora',
  templateUrl: './agora.component.html',
  styleUrls: ['./agora.component.css']
})
export class AgoraComponent implements OnInit {
  idEventMain: number;
  eventmain: Eventmain;
  lecture: boolean;
  token: string;
  login: string;
  password: string;

  constructor(private agoraService:AgoraService) { }

  goget(){
    this.lecture = true;
    this.agoraService.getEventMain(this.idEventMain).subscribe(eventmain => this.eventmain =eventmain);
  }

  exploit(eventmain: Eventmain){
    this.eventmain = eventmain;
    this.lecture = true;
  }

  gopost(){
    this.agoraService.createEventMain(this.eventmain).subscribe(eventmain => this.exploit(eventmain));
  }

  get(): void {
    if (this.token === ''){
      this.agoraService.login = this.login;
      this.agoraService.password = this.password;
      this.agoraService.authenticate().subscribe(any => this.goget());
    }
    else{
      this.agoraService.token = this.token;
      this.goget();
    }
	}

  next(): void {
    this.idEventMain ++;
    this.get();
  }

  new(): void{
    this.eventmain = new Eventmain();
    this.lecture = false;
    this.eventmain.IDCustomer = 5;
    this.eventmain.IDPhysicalCustomer = 178;
    this.eventmain.IDCompanie = 4;
    this.eventmain.IDUser = 14;
    this.eventmain.StartDate = '2020-09-17T14:30:00';
    this.eventmain.EndDate = '2020-09-17T17:00:00';
    this.eventmain.NbPeople = 200;
    this.eventmain.CreationDate = '2020-10-09T17:02:37';
    this.eventmain.MainDate = '2011-09-17';
    this.eventmain.IDStatus = 4;
    this.eventmain.Free1 = 'Cycle RBO';
    this.eventmain.Free2 = '120 min';
    this.eventmain.List1 = 13;
    this.eventmain.IDExternal = 999999;
    this.eventmain.IdAdmin = 1;
    this.eventmain.EventList = [ { IDCompanie: 4, IDUser : 14, StartDate : '2020-09-17T14:30:00', EndDate : '2020-09-17T17:00:00', NbPeople : 200, OptionDate : '2020-07-27T12:02:37', IDStatus : 4, List1 : 61, IDExternal : 999999, IdAdmin : 1, PlaceList : [ { Identity : 2 }] }];
  }

  post(): void {
    if (this.token === ''){
      this.agoraService.login = this.login;
      this.agoraService.password = this.password;
      this.agoraService.authenticate().subscribe(any => this.gopost());
    }
    else{
      this.agoraService.token = this.token;
      this.gopost();
    }
  }

  previous(): void {
    this.idEventMain --;
    this.get();
  }

  ngOnInit() {
    this.idEventMain = 4000;
    this.token = '';
    this.login = '';
    this.password = '';
  }

}
