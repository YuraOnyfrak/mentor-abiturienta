import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';

import {Routes, RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './start-page/start-page.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { UkraineMapComponent } from './ukraine-map/ukraine-map.component';
import { StudentComponent } from './student/student.component';
import { MentorListComponent } from './mentor-list/mentor-list.component';
import { AboutComponent } from './about/about.component';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { JwtInterceptorService } from './shared/interceptors/jwt-interceptor.service';
import { SharedModule } from './shared/shared.module';
import {ToasterModule, ToasterService} from 'angular2-toaster'; 
import {AlertService} from './shared/services/alert.service';
import { ThankYouPageComponent } from './thank-you-page/thank-you-page.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatStepperModule} from '@angular/material/stepper';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { TooltipModule } from 'ng2-tooltip-directive';
import 'hammerjs';
import { DialogWindowsComponent } from './dialog-windows/dialog-windows.component';
import { FAQComponent } from './faq/faq.component';
import { SharingComponent } from './sharing/sharing.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http);
}


const appRoutes: Routes =[
  { path: '', component: AboutComponent},
  { path: 'student', component: StudentComponent},
  { path: 'map', component: UkraineMapComponent},
  { path: 'thank-you', component: ThankYouPageComponent},
  { path: 'faq', component: FAQComponent},
  { path: 'auth', component: AuthenticationComponent},
  { path: 'sharing', component: SharingComponent},
  { path: 'search', component: MentorListComponent}

  // { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    AuthenticationComponent,
    UkraineMapComponent,
    StudentComponent,
    MentorListComponent,
    AboutComponent,
    ThankYouPageComponent,
    DialogWindowsComponent,
    FAQComponent,
    SharingComponent
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
    MatDialogModule,
    MatExpansionModule,
    MatStepperModule,
    ToasterModule,
    MatCardModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TooltipModule,   
    PdfViewerModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      }
    }),
    RouterModule.forRoot(appRoutes, { useHash: true, relativeLinkResolution: 'legacy' }),
    NgxQRCodeModule
  ],
  entryComponents: [AboutComponent, FAQComponent],//, DialogWindowsComponent],    
  providers: [    
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
   // { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    ToasterService,
    AlertService,
    FAQComponent
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
