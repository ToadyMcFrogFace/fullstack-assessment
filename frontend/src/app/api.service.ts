import { Injectable } from '@angular/core';
import { HttpClient} from  '@angular/common/http';


@Injectable({
	providedIn: 'root'
})
export class ApiService {
	// todo, move to env
	// create a file called env.ts inside the ./frontend/src/app directory with the following code:
	// export const API_URL = 'http://localhost:5000';
	API_URL  =  'http://localhost:5000/api/v1.0';

	constructor(private  httpClient:  HttpClient) { }
	
	getEvents() {
		return  this.httpClient.get(`${this.API_URL}/events`);
	}

	createEvent(event) {
		return  this.httpClient.post(`${this.API_URL}/event`, event);
	}
}
