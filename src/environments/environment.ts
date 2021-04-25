// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  cryptocurrencyApi: 'https://api.coincap.io/v2/assets',
  coronavirusApi: 'https://covid-api.mmediagroup.fr/v1/',
  firebaseConfig: {
    apiKey: "AIzaSyD7CINCqbY92rE7Yp_xwd75XAdNCOvME80",
    authDomain: "julio-melchor.firebaseapp.com",
    databaseURL: "https://julio-melchor.firebaseio.com",
    projectId: "julio-melchor",
    storageBucket: "julio-melchor.appspot.com",
    messagingSenderId: "301736888715",
    appId: "1:301736888715:web:a21231b281902d39a8878e",
    measurementId: "G-JXZ1XLN019"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
