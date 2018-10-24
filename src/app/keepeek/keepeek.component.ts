import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Observable } from 'rxjs';
import { Media } from '../media';
import { KeepeekService } from '../keepeek.service';
import { MessageService } from '../message.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-keepeek',
  templateUrl: './keepeek.component.html',
  styleUrls: ['./keepeek.component.css']
})

export class KeepeekComponent implements OnInit {
	medias:Media[];
  idMedia = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*')
  ]);
  login = new FormControl('', [
    Validators.required
  ]);
  password = new FormControl('', [
    Validators.required
  ]);
  matcher = new MyErrorStateMatcher();
  hide = true;

	constructor(private keepeekService: KeepeekService) {}

 	exploit(media: Media): void{
		if (media.id !== 0){this.medias.splice(0,0,media);}
	}

	get(): void {
    this.keepeekService.login = this.login.value;
    this.keepeekService.password = this.password.value;
		this.keepeekService.getMedia(this.idMedia.value).subscribe(media => this.exploit(media));
	}

	next(): void {
    let value = this.idMedia.value;
    value ++;
    this.idMedia.setValue(value);
    this.keepeekService.login = this.login.value;
    this.keepeekService.password = this.password.value;
		this.keepeekService.getMedia(this.idMedia.value).subscribe(media => this.exploit(media));
	}

	clean(): void{
		this.medias = [];
		this.idMedia.setValue(4001);
	}

	ngOnInit(): void {
		this.idMedia.setValue(4001);
		this.medias = [];
	}

}
