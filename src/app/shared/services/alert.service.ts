import { Injectable } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
@Injectable({
  providedIn: 'root'
})
export class  AlertService {

  constructor(public toaster:ToasterService ) { }

  public success(title: string, message?) {
    this.toaster.pop('success', title, message);
  }

  public warning(title: string, message?) {
    this.toaster.pop('warning', title, message);
  }

  public info(title: string, message?) {
    this.toaster.pop('info', title, message);
  }

  public error(title: string, message?) {
    this.toaster.pop('error', title, message);
  }

  public edited(title: string = 'Edited', message?) {
    this.toaster.pop('success', title);
  }

  public deleted(title: string = 'Deleted', message?) {
    this.toaster.pop('success', title);
  }

  public saved(title: string = 'Saved', message?) {
    this.toaster.pop('success', title);
  }

  public added(title: string = 'Added', message?) {
    this.toaster.pop('success', title);
  }
}