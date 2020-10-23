import { Component, OnInit } from '@angular/core';
import { FlightsService } from '../../services/flights.service';
import { autocomplete } from 'air-port-codes-node';
import {  FormGroup, FormControl } from '@angular/forms';
import { Observable,of } from 'rxjs';
import { Airport } from '../../models/airport';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss']
})
export class FlightSearchComponent implements OnInit {

  private apca;
  public airports: Array<Airport> = [];
  
  flightForm = new FormGroup({
    to: new FormControl(),
    fromDate: new FormControl(),
    toDate: new FormControl(),
    stops: new FormControl(),
    minPrice: new FormControl(),
    maxPrice: new FormControl()
  });

  constructor(public flightService: FlightsService, public route: Router) {
    // instantiate the air-port-codes API
    // see teh index.html for the included air-port-codes js library
    this.apca = autocomplete({
      key: '99723a2c29',
      secret: '96facc9fcdf46a6', // Your API Secret Key: use this if you are not connecting from a web server
      limit: 15
    });
  }
  
  ngOnInit(): void {
    this.flightForm.controls.to.valueChanges.subscribe(value => {
       this.onNewSearchTerm(value)
    });
  }

  /**
   * This is triggered on every keypress of the search field
   * @param ev the event object
   */
  async onNewSearchTerm(term: string){

    if (term.length >= 3) {
      // Make the API request
      this.apca.request(term);

      // SUCCESS we found some airports
      this.apca.onSuccess = (data) => {
        this.buildAirportList(data).subscribe(res => {
          console.log(res);
          this.airports = res;
          return "Success";
        });
      };

      // FAIL no airports found
     this.apca.onError = (data) => {
        console.log('onError', data.message);
        this.airports = [];
       return "Faild";

      };

      
    } else {
      this.airports = [];
      return "Enter 3 letters...";

    }
  
  }

  /**
   * This is fired whenever an airport is selected
   * @param airport the selected airport object
   */
  onSelectAirport(airport: any) {
    // do something with the data
    console.log('airport', airport)
  }

  /**
   * This updates the response to add an appropriate label to each airport item
   * @param data the data we get back from the API
   */
  public buildAirportList(data: any): Observable<Array<any>> {
    let listAry = [],
      thisAirport;

    if (data.status) { // success
      for (var i = 0, len = data.airports.length; i < len; i++) {
        thisAirport = data.airports[i];
        listAry.push(this.addAirportLabel(thisAirport));
        if (thisAirport.children) {
          for (var j = 0, jLen = thisAirport.children.length; j < jLen; j++) {
            listAry.push(this.addAirportLabel(thisAirport.children[j], true));
          }
        }
      }
    }
    return of(listAry);
  }

  /**
   * Creates the appropriate label. If it is a child it will add an indent arrow.
   * @param airport the object of a single airport
   * @param isChild a boolean letting us know if this airport is a child of another
   */
  public addAirportLabel(airport: any, isChild?: boolean) {
    let label;
    if (isChild) { // format children labels
      label = airport.iata + ' - ' + airport.name;
    } else { // format labels
      label = airport.iata + ' - ' + airport.name;
    }
    airport.label = label;

    return airport;
  }

  //Search for flights and navigate to show flights page
  public SearchFlights() {
     this.flightService.searchFlights(this.flightForm).subscribe(x => { this.route.navigate(['/show-flights']) });
  }
}
