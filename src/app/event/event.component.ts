import { Component, OnInit, Input } from '@angular/core';
import { Eventmain } from '../eventmain';
import { AgoraService } from '../agora.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  @Input() eventmain: Eventmain;
  modeB:string;
  valueB:number;

  title = new FormControl('', [
    Validators.required
  ]);
  commentary = new FormControl('', [
  ]);

	constructor(private agoraService: AgoraService) {}

  exploit(eventmain){
    this.eventmain = eventmain;
  }

  save(){
    this.modeB = "indeterminate";
    this.eventmain.Title = this.title.value;
    this.eventmain.Commentary = this.commentary.value;
    this.agoraService.createEventMain(this.eventmain).subscribe(eventmain => this.exploit(eventmain));
  }

  public init() {
    this.title.setValue('');
    this.commentary.setValue('');
    this.modeB = "determinate";
    this.valueB = 0;
  }

  ngOnInit() {
    this.init();
  }

  ngOnChanges(){
    this.init();
  }

}
