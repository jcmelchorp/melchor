import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  dataRefs: AngularFireList<any>; // Reference to Student data list, its an Observable
  dataRef: AngularFireObject<any>; // Reference to Student object, its an Observable too
  private DATA_URL_CONFIRMED =
    'https://raw.githubusercontent.com/mexicovid19/Mexico-datos/master/datos_abiertos/series_de_tiempo/nuevos/covid19_mex_confirmados.csv';
  constructor(
    private httpClient: HttpClient,
    private db: AngularFireDatabase
  ) {}
  dataQuest() {
    this.httpClient.get(this.DATA_URL_CONFIRMED).subscribe((data) => {
      //this.dataRefs.push();
    });
  }
}
