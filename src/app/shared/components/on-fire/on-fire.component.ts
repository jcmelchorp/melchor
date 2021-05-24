import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-on-fire',
  templateUrl: './on-fire.component.html',
  styleUrls: ['./on-fire.component.scss']
})
export class OnFireComponent implements OnInit {
  elem;
  constructor() { }

  ngOnInit(): void {
    this.elem = document.querySelector('#firehouse')
  }
  // Magic happens here
  @HostListener("window:mousemove", ["$event"])
  onMouseMove(event) {
    let _w = window.innerWidth / 2;
    let _h = window.innerHeight / 2;
    let _mouseX = event.clientX;
    let _mouseY = event.clientY;
    let _depth1 = `${50 - (_mouseX - _w) * 0.01}% ${50 - (_mouseY - _h) * 0.01}%`;
    let _depth2 = `${50 - (_mouseX - _w) * 0.02}% ${50 - (_mouseY - _h) * 0.02}%`;
    let _depth3 = `${50 - (_mouseX - _w) * 0.03}% ${50 - (_mouseY - _h) * 0.03}%`;
    let _depth4 = `${50 - (_mouseX - _w) * 0.04}% ${50 - (_mouseY - _h) * 0.04}%`;
    let _depth5 = `${50 - (_mouseX - _w) * 0.05}% ${50 - (_mouseY - _h) * 0.05}%`;
    let x = `${_depth5},${_depth4}, ${_depth3}, ${_depth2}, ${_depth1}`;
    //console.log(x);
    this.elem.style.backgroundPosition = x;
  }

}
