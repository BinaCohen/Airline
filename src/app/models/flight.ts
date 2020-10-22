import { Duration } from "./duration";
import { Airport } from '../models/airport';

export class Flight {

  origin: Airport;
  destination: Airport;
  departureDate: Date;
  landingDate: Date;
  duration: Duration;
  price: number;

  constructor(origin: Airport = new Airport(), destination: Airport = new Airport(), departureDate: Date = new Date(), landingDate: Date = new Date(), price: number = 0) {
    this.origin = new Airport(origin.city, origin.country, origin.iata, origin.label, origin.name, origin.state);
    this.destination = new Airport(destination.city, destination.country, destination.iata, destination.label, destination.name, destination.state);
    this.departureDate = departureDate;
    this.landingDate = landingDate;
    this.duration = new Duration(departureDate, landingDate);
    this.price = price;
  }
}
