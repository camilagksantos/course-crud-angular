import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '../shared/angular-material/angular-material-module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [App]
})
export class AppModule { }
