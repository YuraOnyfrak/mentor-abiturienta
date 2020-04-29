import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-thank-you-page',
  templateUrl: './thank-you-page.component.html',
  styleUrls: ['./thank-you-page.component.css']
})
export class ThankYouPageComponent implements OnInit, AfterViewInit {

  @ViewChild("shareBtn", {static: false})
  share: ElementRef;
  constructor() { }

  ngOnInit() {
   
  }

  ngAfterViewInit(): void {
    this.convertToScript();
  }

   convertToScript() {
    const element = this.share.nativeElement;
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?5'; 
    script.setAttribute('data-telegram-share-url', "https://mentor-abiturienta.imfast.io");
    script.setAttribute('data-comment', 'Допоможи абітурієнтом з вибором професії!');
    script.setAttribute('data-size', 'large');
    element.parentElement.replaceChild(script, element);
  }
}
