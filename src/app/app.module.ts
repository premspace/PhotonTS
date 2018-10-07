import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {Router} from '@angular/router';
import {AppRoutingModule} from '../app/app-routing.module';
import {LoginComponent} from '../app/core/login.component';
import {LoginRoutingModule} from '../app/core/login-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import {ProjectModule} from './project/project.module';

import { ExtHttpConfig } from '../app/core/ExtHttpConfig';
import { LocalStorage } from '../app/core/localStorage';
import {ExtHttp} from '../app/core/extHttp.service';
import {LoginService} from '../app/core/login.service';

import { NavigationComponent } from '../app/core/navigation.component';

const host = window.location.hostname;
let baseUrl = 'http://localhost:4000';
let apiUrl = 'http://localhost:54944/';
 
const extHttpConfig = {
  url: apiUrl
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    LoginRoutingModule,
    CoreModule.forRoot(extHttpConfig),
    ProjectModule,
    AppRoutingModule,
  ],
  providers: [ LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
