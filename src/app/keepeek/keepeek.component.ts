import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Media } from '../media';
import { KeepeekService } from '../keepeek.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-keepeek',
  templateUrl: './keepeek.component.html',
  styleUrls: ['./keepeek.component.css']
})

export class KeepeekComponent implements OnInit {
	media:Media;
	medias:Media[];
	id: number;
  login: string;
  password: string;

	constructor(private keepeekService: KeepeekService) {}

 	exploit(media: Media): void{
		this.media = media;
		if (this.media.id !== 0){this.medias.push(media);}
	}

	get(): void {
    this.keepeekService.login = this.login;
    this.keepeekService.password = this.password;
		this.keepeekService.getMedia(this.id).subscribe(media => this.exploit(media));
	}

	next(): void {
		this.id ++;
    this.keepeekService.login = this.login;
    this.keepeekService.password = this.password;    
		this.keepeekService.getMedia(this.id).subscribe(media => this.exploit(media));
	}

	clean(): void{
		this.medias = [];
		this.media = null;
		this.id = 4000;
	}

	ngOnInit(): void {
		this.id = 4000;
		this.medias = [];
	}

}
