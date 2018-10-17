import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Eventmain } from './eventMain';

const agoraUrl: string = 'http://agora:81/api';

@Injectable({
  providedIn: 'root'
})
export class AgoraService {
  eventMainDefault: Eventmain;

  public token: string = '';
  public login: string = '';
  public password: string = '';
  private url: string;
  private message: string;
  private httpOptions = {
  	headers: new HttpHeaders({'Content-Type' : 'application/json' })
  };

  constructor(
		private messageService: MessageService,
		private http: HttpClient
		) { }

  retourAuthenticate(token:string){
    this.token = token;
    this.messageService.add(this.token);
  }

  authenticate(): Observable<any>{
    this.url = `${agoraUrl}/Authentication/authenticate`;
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type' : 'application/json'})
    };
    this.message = `{"Login": "${this.login}","Password": "${this.password}"}`;
		return this.http.post<string>(this.url, this.message, this.httpOptions).pipe(
			  tap(token => this.retourAuthenticate(token)),
				catchError(this.handleError('authenticate'))
		);
  }

  getEventMain(idEventMain:number): Observable<Eventmain> {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type' : 'application/json', 'AgoraEvent-Token' : this.token })
    };
    this.url = `${agoraUrl}/eventMain/${idEventMain}`;
    return this.http.get<Eventmain>(this.url, this.httpOptions).pipe(
        tap(_ => this.messageService.add(`${idEventMain} fetched`)),
        catchError(this.handleError('getEventMain',this.eventMainDefault ))
    );
	}

  createEventMain(eventMain:Eventmain): Observable<Eventmain> {
    this.messageService.add(eventMain.Title);
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type' : 'application/json', 'AgoraEvent-Token' : this.token})
    };
    this.url = `${agoraUrl}/eventMain`;
    return this.http.post<Eventmain>(this.url, eventMain, this.httpOptions).pipe(
        tap(_ => this.messageService.add(`new event created`)),
        catchError(this.handleError('createEventMain',this.eventMainDefault ))
    );
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
 private handleError<T> (operation = 'operation', result?: T) {
   return (error: any): Observable<T> => {

     // TODO: send the error to remote logging infrastructure
     console.error(error); // log to console instead

     // TODO: better job of transforming error for user consumption
     this.messageService.add(`${operation} failed: ${error.message}`);

     // Let the app keep running by returning an empty result.
     return of(result as T);
   };
 }

}
