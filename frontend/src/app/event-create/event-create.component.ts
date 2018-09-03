import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';


import { } from '@types/googlemaps';

@Component({
	selector: 'app-event-create',
	templateUrl: './event-create.component.html',
	styleUrls: ['./event-create.component.css']
})

export class EventCreateComponent implements OnInit {
	@ViewChild('gmap') gmapElement: any;
	map: google.maps.Map;
	public  geolocations:  Array<any> = [];
	public  markers:  Array<object> = [];

	event = {
		name: '',
		start_date: '',
		end_date: '',
		geolocations: []
	}

	constructor(private apiService: ApiService) { }

	ngOnInit() {
		var mapProp = {
			center: new google.maps.LatLng(18.5793, 73.8143),
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

		this.map.addListener('click', (e) => this.placeMarkerAndPanTo(e.latLng, this.map));
	}

	placeMarkerAndPanTo(latLng, map) {
		var marker = new google.maps.Marker({
			// draggable: true,
			position: latLng,
			map: map,
		});
		map.panTo(latLng);

		marker.set('id', new Date().getTime() );

		var geolocation = {
			lat: marker.getPosition().lat(),
			long: marker.getPosition().lng(),
			id: marker.get('id')
			// date: 
		}
		this.markers.push(marker);
		this.geolocations.push(geolocation);

		google.maps.event.addListener(marker, 'rightclick', () => this.removeMarker(marker));

		// hacks
		document.getElementById("hacks").click();
	}

	removeMarker(marker) {
		marker.setMap(null)
		// remove geolocation for geolocations array
		this.geolocations = this.geolocations.filter(function( obj ) {
			return obj.id !== marker.get('id');
		});
		//remove marker from markers array
		delete this.markers[marker.get('id')]
	}

	createEvent() {
		this.event.geolocations = this.geolocations;
		this.apiService.createEvent(this.event).subscribe((response) => {
			console.log(response)
		})
	}
}
