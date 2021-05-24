import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
const BASE_URL = 'https://en.wikipedia.org/wiki';

@Component({
  selector: 'app-wiki',
  templateUrl: './app-wiki.component.html',
  styleUrls: ['./app-wiki.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppWikiComponent implements OnInit, AfterViewInit {
  @Input()
  atomName: string;

  @Output()
  closeModal = new EventEmitter<void>();

  @ViewChild('iframe')
  iframe: ElementRef<HTMLIFrameElement>;

  @ViewChild('closeModalDiv')
  closeModalDiv: ElementRef<HTMLDivElement>;

  @ViewChild('loader')
  loader: ElementRef<HTMLDivElement>;

  @ViewChild('modalContent')
  modalContent: ElementRef<any>;

  url: SafeUrl;

  constructor(private santiizer: DomSanitizer, private renderer: Renderer2) { }

  ngOnInit() {
    this.url = this.santiizer.bypassSecurityTrustResourceUrl(`${BASE_URL}/${this.atomName}`);
  }

  ngAfterViewInit() {
    const el = this.iframe.nativeElement;
    el.onload = () => {
      this.renderer.setStyle(this.getNativeElement(this.loader), 'opacity', '0');
      this.renderer.setStyle(this.getNativeElement(this.loader), 'width', '0');
      this.renderer.setStyle(this.getNativeElement(this.loader), 'height', '0');
      this.renderer.setStyle(el, 'opacity', '1');
      this.renderer.setStyle(el, 'width', '100%');
      this.renderer.setStyle(el, 'height', 'calc(100% - 3rem)');
      this.renderer.setStyle(this.getNativeElement(this.closeModalDiv), 'display', 'block');
      this.renderer.setStyle(this.getNativeElement(this.modalContent), 'background', '#fff');
    };
  }

  private getNativeElement(el: ElementRef) {
    return el.nativeElement;
  }
}
