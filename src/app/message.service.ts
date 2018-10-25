import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(public snackBar: MatSnackBar) { }

	messages: string[] = [];

	add(message: string){
		this.messages.push(message);
    this.snackBar.open(message, 'OK', {duration: 5000});
  }

	clear(){
		this.messages = [];
	}

}
