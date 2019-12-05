import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParticipantComponent } from './participant/participant/participant.component';
// import { CodeInComponent } from './code-in/code-in.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponent,
    ParticipantComponent,
    // CodeInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
