import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FbLeakService {
  data: string = '.csv';
  constructor(private http: HttpClient) { }
  getInfo() {
    return this.http.get(this.data, { responseType: 'text' });
  }

}
