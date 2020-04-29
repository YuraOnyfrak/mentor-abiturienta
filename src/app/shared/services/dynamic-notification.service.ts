import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { ValidationResult } from '../models/Common/validation-result';
import { ValidationState } from '../models/Common/enum/validation-state.enum';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicNotificationService {

  constructor(
    private alert: AlertService,
    private translate: TranslateService
    ) { }

  validationMessage(validationResult: ValidationResult): boolean {
    let flag: boolean = false;

    switch (validationResult.status) {
      case ValidationState.Warning:
        this.alert.warning("", validationResult.message);
        flag = true;
        break;      
      case ValidationState.Error:
        this.alert.error("", validationResult.message);
        flag = true;
        break;
      case ValidationState.Info:
        this.alert.info("", validationResult.message);
        flag = true;
        break;
      default:
    }  

    return flag;
  }

  invalidFormMessagePop(fieldKey: string, keyError: string) {
    let message = '';
    
    switch (keyError) {
      case 'required':        
        message = this.translate.instant('required', {fieldKey: this.translate.instant(fieldKey)});
        break;
      case 'email':
        message = fieldKey + ' ' + 'required';;
        break;
      case 'minlength':
        message = this.translate.instant(fieldKey + "-minlength");
        break;
      case 'max':
        message = this.translate.instant(fieldKey + "-max");
        break;
      case 'min':
        message = this.translate.instant(fieldKey + "-min");
        break;
      case 'mustMatch':
        message = fieldKey + ' ' + 'mustMatch';
      default:
        message = fieldKey + ' ' + keyError;
        break;
    }
    this.alert.warning('', message);
  }  
}
