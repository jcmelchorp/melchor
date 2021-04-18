import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatesService {
  constructor(private httpClient: HttpClient) {}

  getTotals() {
    return this.httpClient
      .get(
        'https://raw.githubusercontent.com/JulioMelchorPinto/coronavirus-mx-datos/master/data/timeseries/acumul/nacional.json',
        {
          params: new HttpParams({ fromString: '' }),
          observe: 'response',
        }
      )
      .pipe(retry(3), catchError(this.handleError));
  }
  // Error handling
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  getNuevosCasos() {
    return this.httpClient.get('assets/data/nuevos-casos.json');
  }
  getTotalCasos() {
    return this.httpClient.get('assets/data/total-casos.json');
  }
  getNuevasMuertes() {
    return this.httpClient.get('assets/data/nuevas-muertes.json');
  }
  getTotalMuertes() {
    return this.httpClient.get('assets/data/total-muertes.json');
  }
  getNegativos() {
    return this.httpClient.get('assets/data/casos-negativos.json');
  }
  getSospechosos() {
    return this.httpClient.get('assets/data/casos-sospechosos.json');
  }
}
