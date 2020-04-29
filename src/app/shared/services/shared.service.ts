import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TelegramResponse } from '../models/telegram-response';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private telegramResponse = new BehaviorSubject(new TelegramResponse());
  sharedRelegramResponse = this.telegramResponse.asObservable();

  constructor() { }

  nextMessage(value: TelegramResponse) {
    this.telegramResponse.next(value)
  }
}
