import { Component, OnInit, ViewChildren, QueryList, ElementRef, ViewChild, AfterViewInit, NgZone, Injector } from '@angular/core';
import { LoginService } from '../shared/services/login.service';
import { interval } from 'rxjs';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { TelegramResponse } from '../shared/models/telegram-response';
import { SharedService } from '../shared/services/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, AfterViewInit {
  @ViewChild('submitBtn', {static: true}) submitBtn: ElementRef;
  @ViewChildren('pinInput') pinInputs: QueryList<any>;

  @ViewChild("nameText", {static: false})
  nameParagraph: ElementRef;
   
  name: string = "Tom";
  @ViewChild('script', {static: true}) script: ElementRef;

  sentCode: boolean = false;
  phone: string;
  codeGroup: FormGroup;
  error: boolean = false;
  timeRefresh;

  private guidTicketId: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private injector: Injector
  ) { }

  

  convertToScript() {
    //console.log(this.nameParagraph.nativeElement.textContent); 
    //this.nameParagraph.nativeElement.textContent = "hell";

    const element = this.nameParagraph.nativeElement;
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?5';    
    script.setAttribute('data-telegram-login', environment.telegramBot);
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-userpic', 'false');
    script.setAttribute('data-onauth', 'loginViaTelegram(user)');
    script.setAttribute('data-request-access', 'write');
    element.parentElement.replaceChild(script, element);
  }

  loginViaTelegram(user: TelegramResponse) {    
    this.loginService.telegramAuthentication(user)
        .subscribe(
          (response) => {   
            const routerService = this.injector.get(Router);
            const ngZone = this.injector.get(NgZone);
            ngZone.run(() => {
             // this.sharedService.nextMessage(user)
              this.router.navigate(['/student'], { skipLocationChange: true })
            });
          },
          error => {
            console.log(error)
          });
  }

  ngAfterViewInit(): void {
    this.convertToScript();
  }

  ngOnInit() {
    window['loginViaTelegram'] = loginData => this.loginViaTelegram(loginData);
  }

  login() {
    let u = new TelegramResponse();
    
    u.photo_url = 'https://t.me/i/userpic/320/dM5ldIjGKX5KJv4IkzPzaac1kkoEzSnwJc6WnhFPQDE.jpg';
    u.auth_date = 1586546525;
    u.Hash = "a169704351d77e04dc3e55903dedfc9a9b230505bc8b6931f434cce115607d37";
    u.first_name = "Юрій";
    u.Last_name = "Олійник";
    u.Id = 385222709;
    u.username = "oliinyk_yuriy"
    
    this.loginViaTelegram(u);
  }
}
