import { Component, OnInit, Input } from '@angular/core';
import { Eventmain } from '../eventmain';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  @Input() eventmain: Eventmain;
  @Input() lecture: boolean;

  constructor() { }

  ngOnInit() {
  }

}
