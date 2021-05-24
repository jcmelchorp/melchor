import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class GliphyService {
  data: any;
  private SERVER_URL = "https://api.giphy.com/v1/gifs/random?";
  private API_KEY = "Om7ebMxISDE9J8zXZn3aVgmApYDX7gfz";
  paramTag = 'cat';
  paramApiKey = this.API_KEY;
  constructor(
    private httpClient: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getGif(): Observable<any> {
    return this.httpClient
      .get(this.SERVER_URL + 'api_key=' + this.paramApiKey + '&tag=' + this.paramTag)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  // Error handling
  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
