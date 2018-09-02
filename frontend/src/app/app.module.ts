import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from  '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
// import { MapComponent } from './map/map.component';


@NgModule({
	declarations: [
		AppComponent,
		EventListComponent,
		EventCreateComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		AgmCoreModule.forRoot({apiKey: 'AIzaSyDHRTSMInhK_oQSfl-hjK-WlQA4OVZ0nDM'}),
		FormsModule,
		NgbModule.forRoot()
	],
	providers: [
		GoogleMapsAPIWrapper
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
