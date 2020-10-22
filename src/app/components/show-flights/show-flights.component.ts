import { Component, OnInit } from '@angular/core';
import { FlightsService } from '../../services/flights.service';

@Component({
  selector: 'app-show-flights',
  templateUrl: './show-flights.component.html',
  styleUrls: ['./show-flights.component.scss']
})
export class ShowFlightsComponent implements OnInit {

  constructor(public flightService: FlightsService) {
  }
  ngOnInit(): void {
  }

  sortByStops() {
    this.flightService.sortFlightsByStops();
  }

  sortByDuration() {
    this.flightService.sortFlightsByDuration();
  }

  sortByPrice() {
    this.flightService.sortFlightsByPrice();
  }
}
