import { Flight } from "./flight";
import { Duration } from "./duration";

export class Route {

  duration: Duration;
  stops: number;
  price: number;
  flights: Array<Flight>;

  constructor() {
    this.duration = new Duration();
    this.stops = -1;
    this.price = 0;
    this.flights = new Array<Flight>();
  }
}
