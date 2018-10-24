import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Media } from './media' ;
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class KeepeekService {
	media : Media = {id : 0, title : '', auteur : '', _links : { preview : { href : '' }, "kpk:large" : { href : '' }}, _embedded :{metadata:[{id : '',value : ''}]}};

	public login: string = '';
  public password: string = '';
	private keepeekUrl = 'https://keepeek.cinematheque.fr/api/dam';
	private reponse:string;

  constructor(
		private messageService: MessageService,
		private http: HttpClient
		) { }

	getMediaTest(identifiant:number): Observable<Media> {
		this.messageService.add(`debut traitement demande media ${identifiant}`);
		this.media.id = identifiant;
		this.media.title = 'Mon media';
		this.messageService.add(`titre reçu : ${this.media.title}`);
		this.messageService.add(`fin`);
		return of(this.media);
	}

	getMedia(identifiant:number): Observable<Media> {
		const url = `${this.keepeekUrl}/medias/${identifiant}`;
		const httpOptions = {
			headers: new HttpHeaders({ 'Authorization' : 'Basic ' + btoa(`${this.login}:${this.password}`), 'Content-Type' : 'application/hal+json' })
		};
		return this.http.get<Media>(url, httpOptions).pipe(
			  tap(media => this.messageService.add(`fetched media ${identifiant}`)),
				catchError(this.handleError('getMedia', this.media))
			);
	}

	updateMedia(media: Media, credit: string): Observable<any> {
		const url = `${this.keepeekUrl}/medias/${media.id}/metadatas/credit_juridique`;
		const httpOptions = {
			headers: new HttpHeaders({ 'Authorization' : 'Basic ' + btoa(`${this.login}:${this.password}`), 'Content-Type' : 'application/hal+json' })
		};
		this.reponse = `{"value": "${credit}"}`;
		return this.http.put(url, this.reponse, httpOptions).pipe(
			tap(_ => this.messageService.add(`updated media id =${media.id}`)),
			catchError(this.handleError<any>('updateMedia'))
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
