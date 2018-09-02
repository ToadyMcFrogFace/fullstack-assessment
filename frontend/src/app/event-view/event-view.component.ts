import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../api.service';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {

	private  event:  Array<object> = [];
	id = ''

	constructor(private  apiService:  ApiService) { }

	ngOnInit() {
		this.getEvent();
	}

	public getEvent() {
		// get id from url
		// todo, figure out the proper angular way to get id passed from routerLink
		var href = location.href;
		this.id = href.match(/([^\/]*)\/*$/)[1];
		this.apiService.getEvent(this.id).subscribe((data:  Array<object>) => {
			this.event  =  data;
			console.log(data);
		});
	}
}
