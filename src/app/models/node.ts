import { Flight } from "./flight";
import { Route } from "./route";

export class Node {

  visited: boolean;
  flights: Array<Flight>; //טיסות יוצאות
  routes: Array<Route>; //רשימת מסלולים

  constructor() {
    this.visited = false;
    this.flights = new Array<Flight>();
    this.routes = new Array<Route>();
  }

}
