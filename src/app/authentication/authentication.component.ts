import { Component, OnInit, ViewChildren, QueryList, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { LoginService } from '../shared/services/login.service';
import { interval } from 'rxjs';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { TelegramResponse } from '../shared/models/telegram-response';
import { SharedService } from '../shared/services/shared.service';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }
  
}
