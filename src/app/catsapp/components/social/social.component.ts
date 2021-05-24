import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-social',
    templateUrl: './social.component.html',
    styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit, OnDestroy {
    public result: any;
    public objectResult: Subscription;
    private GIF_URL = "https://api.tenor.com/v1/search?q=cat&key=LIVDSRZULELA&limit=8";
    constructor(public httpClient: HttpClient) { }


    ngOnInit(): void {
        this.objectResult = this.httpClient.get(this.GIF_URL).subscribe(data => {
            this.result = data;
            console.log(this.result);
        });

    }
    ngOnDestroy() {
        this.objectResult.unsubscribe();
    }
}
