import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';

import {Routes, RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './start-page/start-page.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { UkraineMapComponent } from './ukraine-map/ukraine-map.component';
import { StudentComponent } from './student/student.component';
import { SearchMentorComponent } from './search-mentor/search-mentor.component';
import { MentorListComponent } from './mentor-list/mentor-list.component';
import { AboutComponent } from './about/about.component';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { JwtInterceptorService } from './shared/interceptors/jwt-interceptor.service';
import { SharedModule } from './shared/shared.module';
import {ToasterModule, ToasterService} from 'angular2-toaster'; 
import {AlertService} from './shared/services/alert.service';
import { ThankYouPageComponent } from './thank-you-page/thank-you-page.component';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { TooltipModule } from 'ng2-tooltip-directive';
import 'hammerjs'

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http);
}


const appRoutes: Routes =[
  { path: '', component: AboutComponent},
  { path: 'student', component: StudentComponent},
  { path: 'map', component: UkraineMapComponent},
  { path: 'thank-you', component: ThankYouPageComponent},
  { path: 'auth', component: AuthenticationComponent}
  // { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    AuthenticationComponent,
    UkraineMapComponent,
    StudentComponent,
    SearchMentorComponent,
    MentorListComponent,
    AboutComponent,
    ThankYouPageComponent
  ],
  imports: [
    MatAutocompleteModule,
    MatSelectModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    ToasterModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TooltipModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      }
    }),
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  providers: [    
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    ToasterService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
