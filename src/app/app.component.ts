import { Component } from '@angular/core';
import { ToasterConfig} from 'angular2-toaster';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(translate: TranslateService) {
    translate.addLangs(['uk', 'klingon'])
    translate.setDefaultLang('uk');
    translate.use('uk');
  }
  
  title = 'MentorEntrant';

  public toasterConfig: ToasterConfig =
    new ToasterConfig({
      positionClass: 'toast-top-right',
      animation: 'flyRight',
      newestOnTop: true
    });
}
