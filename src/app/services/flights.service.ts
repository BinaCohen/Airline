import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Flight } from '../models/flight';
import { Node } from '../models/node';
import { Route } from '../models/route';
import { Duration } from '../models/duration';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  constructor(public httpClient: HttpClient, private datePipe: DatePipe) {
    this.initMap();
  }

  flightsSearchResult: Array<Route> = [];
  maxStops: number = 0;
  flightsMap: Map<string, Node> = new Map<string, Node>();
  flightForm: any;

  //Flight array - according to air-port-codes API infra structure
  flights: Array<Flight> = [new Flight({
    city: "Tel Aviv",
    country: { name: "Israel", iso: "IL" },
    iata: "TLV",
    label: "TLV - Ben Gurion International Airport",
    name: "Ben Gurion International Airport",
    state: { name: "Central District ", abbr: null }
  },
    {
      city: "Lisbon",
      country: { name: "Portugal", iso: "PT" },
      iata: "LIS",
      label: "LIS - Lisbon Portela Airport",
      name: "Lisbon Portela Airport",
      state: { name: "Lisbon", abbr: null },
    },
    new Date("12/10/2020 09:00:00"),
    new Date("12/10/2020 14:45:00"), 130),
  new Flight({
    city: "Tel Aviv",
    country: { name: "Israel", iso: "IL" },
    iata: "TLV",
    label: "TLV - Ben Gurion International Airport",
    name: "Ben Gurion International Airport",
    state: { name: "Central District ", abbr: null }
  },
    {
      city: "Lisbon",
      country: { name: "Portugal", iso: "PT" },
      iata: "LIS",
      label: "LIS - Lisbon Portela Airport",
      name: "Lisbon Portela Airport",
      state: { name: "Lisbon", abbr: null },
    },
    new Date("11/10/2020 15:40:00"),
    new Date("11/10/2020 19:00:00"), 150),
  new Flight({
    city: "Tel Aviv",
    country: { name: "Israel", iso: "IL" },
    iata: "TLV",
    label: "TLV - Ben Gurion International Airport",
    name: "Ben Gurion International Airport",
    state: { name: "Central District ", abbr: null }
  },
    {
      city: "Lisbon",
      country: { name: "Portugal", iso: "PT" },
      iata: "LIS",
      label: "LIS - Lisbon Portela Airport",
      name: "Lisbon Portela Airport",
      state: { name: "Lisbon", abbr: null },
    },
    new Date("11/01/2020 15:40:00"),
    new Date("11/01/2020 19:00:00"), 300),
  new Flight({
    city: "Paris",
    country: { name: "France", iso: "FR" },
    iata: "PAR",
    label: "PAR - Paris - All Airports",
    name: "Paris - All Airports",
    state: { name: "Île-de-France", abbr: "IF" }
  },
    {
      city: "Lisbon",
      country: { name: "Portugal", iso: "PT" },
      iata: "LIS",
      label: "LIS - Lisbon Portela Airport",
      name: "Lisbon Portela Airport",
      state: { name: "Lisbon", abbr: null },
    },
    new Date("11/02/2020 20:40:00"),
    new Date("11/03/2020 01:00:00"), 100),
  new Flight({
    city: "London",
    country: { name: "United Kingdom", iso: "GB" },
    iata: "LON",
    label: "LON - London - All Airports",
    name: "London - All Airports",
    state: { name: "London", abbr: null }
  },
    {
      city: "Lisbon",
      country: { name: "Portugal", iso: "PT" },
      iata: "LIS",
      label: "LIS - Lisbon Portela Airport",
      name: "Lisbon Portela Airport",
      state: { name: "Lisbon", abbr: null },
    },
    new Date("11/01/2020 20:00:00"),
    new Date("11/01/2020 23:00:00"), 200),
  new Flight({
    city: "Tel Aviv",
    country: { name: "Israel", iso: "IL" },
    iata: "TLV",
    label: "TLV - Ben Gurion International Airport",
    name: "Ben Gurion International Airport",
    state: { name: "Central District ", abbr: null }
  },
    {
      city: "London",
      country: { name: "United Kingdom", iso: "GB" },
      iata: "LON",
      label: "LON - London - All Airports",
      name: "London - All Airports",
      state: { name: "London", abbr: null }
    },
    new Date("11/01/2020 18:00:00"),
    new Date("11/01/2020 19:14:00"), 100),
  new Flight({
    city: "Lisbon",
    country: { name: "Portugal", iso: "PT" },
    iata: "LIS",
    label: "LIS - Lisbon Portela Airport",
    name: "Lisbon Portela Airport",
    state: { name: "Lisbon", abbr: null },
  },
    {
      city: "Paris",
      country: { name: "France", iso: "FR" },
      iata: "PAR",
      label: "PAR - Paris - All Airports",
      name: "Paris - All Airports",
      state: { name: "Île-de-France", abbr: "IF" }
    },
    new Date("11/02/2020 15:40:00"),
    new Date("11/02/2020 20:00:00"), 100)
  ]



  //Search flights function
  searchFlights(flightForm): Observable<Array<Route>> {

    this.flightForm = flightForm;
    let date;
    let fromDate;
    let toDate;

    //In case there is no destination
    if (!this.flightForm.value.to) {
      this.flightsSearchResult = [];
      this.flightsMap.forEach((value: Node, key: string) => {
        value.routes.forEach(route => {
          this.flightsSearchResult.push(route)
        });
      });
    }
    else {
      if (this.flightsMap.get(this.flightForm.value.to.substring(0, 3))) {
        this.flightsSearchResult = this.flightsMap.get(this.flightForm.value.to.substring(0, 3)).routes;
      } else {
        this.flightsSearchResult = [];
      }
    }

    //In case there is no minimum price
    if (!this.flightForm.value.minPrice) {
      this.flightForm.value.minPrice = 0;
    }

    //In case there is no maximum price
    if (!this.flightForm.value.maxPrice) {
      this.flightForm.value.maxPrice = 10000;
    }

    //In case there is no start date
    if (!this.flightForm.value.fromDate) {
      date = this.dateFormat('1900-01-01');
    } else {
      date = this.dateFormat(this.flightForm.value.fromDate);
    }

    fromDate = (new Date(date.year, date.month, date.day)).getTime();

    //In case there is no end date
    if (!this.flightForm.value.toDate) {
      let maxDt = new Date();
      date = this.dateFormat(this.datePipe.transform(maxDt.setFullYear(maxDt.getFullYear() + 10), 'yyyy-MM-dd')); 

    } else {
      date = this.dateFormat(this.flightForm.value.toDate);
    }

    toDate = (new Date(date.year, date.month, date.day, 23, 59, 59)).getTime();

    //In case there is no stops
    if (!this.flightForm.value.stops) {
      this.flightForm.value.stops = 3;
    }

    //In case the value is 3+ stops
    if (this.flightForm.value.stops === 3) {
      this.maxStops = 1000;
    }
    else {
      this.maxStops = this.flightForm.value.stops;
    }

    //Search for flights according to the parameters separately or combine them together
    this.flightsSearchResult = this.flightsSearchResult.filter(flight =>
      flight.price >= this.flightForm.value.minPrice
      && flight.price <= this.flightForm.value.maxPrice
      && flight.flights[0].departureDate.getTime() >= fromDate
      && flight.flights[0].departureDate.getTime() <= toDate
      && flight.stops <= this.maxStops
    );

    return of(this.flightsSearchResult);
  }

  dateFormat(date) {

    let year = date.substring(0, 4);
    let month = date.substring(5, 7) - 1;
    let day = date.substring(8, 10);

    return { "year": year, "month": month, "day": day }
  }

  //Temp function for sort
  compare(a, b) {

    const bandA = a.duration.timeMS;
    const bandB = b.duration.timeMS;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }

  //Sort flights by stops - asc
  sortFlightsByStops() {
    this.flightsSearchResult = this.flightsSearchResult.sort((a, b) => (a.stops > b.stops) ? 1 : -1);
  }

  //Sort flights by total flight duration - asc
  sortFlightsByDuration() {
    this.flightsSearchResult = this.flightsSearchResult.sort(this.compare);
  }

  //Sort flights by total price - asc
  sortFlightsByPrice() {
    this.flightsSearchResult = this.flightsSearchResult.sort((a, b) => (a.price > b.price) ? 1 : -1);
  }

  //Init flight map - efficient data structure
  initMap() {
    for (let item of this.flights) {
      let v = item.origin.iata;
      let node = this.flightsMap.get(v);
      if (!node) {
        this.flightsMap.set(v, new Node());
      }
      this.flightsMap.get(v).flights.push(item);
    }
    this.buildTree();
  }

  //Build tree contain the parameters for sort - Total price, Stops count, Total duration
  buildTree() {
    for (let item of this.flightsMap.get("TLV").flights) {
      this.setNode(item, new Route());
    }
  }

  //Depth-first search Algorithm - find all routes departing from TLV for every destination
  setNode(flight: Flight, prevRoute: Route) {

    let v = flight.destination.iata;

    if (!this.flightsMap.get(v)) {
      this.flightsMap.set(v, new Node());
    }
    if (!this.flightsMap.get(v).visited) {

      let route = new Route();

      if (prevRoute.flights.length > 0) {
        route.duration = new Duration(prevRoute.flights[0].departureDate, flight.landingDate);
      }
      else {
        route.duration = new Duration(flight.departureDate, flight.landingDate);
      }

      route.stops = prevRoute.stops + 1;

      for (let flightRoute of prevRoute.flights) {
        route.flights.push(flightRoute);
        route.price += flightRoute.price;
      }

      route.flights.push(flight);
      route.price += flight.price;

      this.flightsMap.get(v).routes.push(route);
      for (let item of this.flightsMap.get(v).flights) {

        let diff = item.departureDate.getTime() - flight.landingDate.getTime();

        //Check that the next flight departs within half an hour to a day of landing
        if (diff > 1200000 && diff < 86400000) {
          this.flightsMap.get(v).visited = true;
          this.setNode(item, route);
          this.flightsMap.get(v).visited = false;
        }
      }
    }
  }
}
