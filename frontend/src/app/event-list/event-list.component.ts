import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../api.service';


@Component({
	selector: 'app-event-list',
	templateUrl: './event-list.component.html',
	styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

	private  events:  Array<object> = [];

	constructor(private  apiService:  ApiService) { }

	ngOnInit() {
		this.getEvents();
	}

	public getEvents() {
		this.apiService.getEvents().subscribe((data:  Array<object>) => {
			this.events  =  data;
			console.log(data);
		});
	}

}
