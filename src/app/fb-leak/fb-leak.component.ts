import { Component, OnInit } from '@angular/core';

import { FbLeakService } from './services/fb-leak.service';

@Component({
  selector: 'app-fb-leak',
  templateUrl: './fb-leak.component.html',
  styleUrls: ['./fb-leak.component.scss']
})
export class FbLeakComponent implements OnInit {
  data: any[] = [];
  constructor(private fbleakService: FbLeakService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.fbleakService.getInfo().subscribe(data => {
      const list = data.split('\n');
      list.forEach(row => {
        this.data.push(row);
      });
    });
  }
}
