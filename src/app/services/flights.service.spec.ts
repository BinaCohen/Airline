import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FlightsService } from './flights.service';
import { DatePipe } from '@angular/common';

describe('FlightsService', () => {
  let service: FlightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [DatePipe]
    });
    service = TestBed.inject(FlightsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('searchFlights("LIS") return the flight list with LIS destination', () => {
    let form = {
      value: { "to": "LIS", "fromDate": null, "toDate": null, "stops": null, "minPrice": 0, "maxPrice": null }
    }
    service.searchFlights(form).subscribe(res => {
      res.forEach(route => {
        console.log("Destination: "+ route.flights[route.flights.length - 1].destination.iata);
        expect(route.flights[route.flights.length - 1].destination.iata).toEqual("LIS");
      });
    });
  });

  it('searchFlights() return the flight list from 2020-11-10', () => {
    let form = {
      value: { "to": "", "fromDate": "2020-11-10", "toDate": null, "stops": null, "minPrice": 0, "maxPrice": null }
    }
    service.searchFlights(form).subscribe(res => {
      res.forEach(route => {
        console.log("Date: " + route.flights[0].departureDate);
        let date = new Date(2020, 11 - 1, 10).getTime();
        expect(route.flights[0].departureDate.getTime()).toBeGreaterThan(date);
        });
    });
  });

  it('searchFlights() return the flight list between dates 2020-11-10 and 2020-11-10', () => {
    let form = {
      value: { "to": "", "fromDate": "2020-11-10", "toDate": "2020-11-10", "stops": null, "minPrice": 0, "maxPrice": null }
    }
    service.searchFlights(form).subscribe(res => {
      res.forEach(route => {
        console.log("Date: " + route.flights[0].departureDate);
        let fromDate = new Date(2020, 11 - 1, 10).getTime();
        let toDate = new Date(2020, 11 - 1, 10, 23, 59, 59).getTime();
        expect(route.flights[0].departureDate.getTime()).toBeGreaterThanOrEqual(fromDate);
        expect(route.flights[0].departureDate.getTime()).toBeLessThanOrEqual(toDate);
      });
    });
  });

  it('searchFlights() return the direct flight list ', () => {
    let form = {
      value: { "to": "", "fromDate": null, "toDate": null, "stops": "0", "minPrice": 0, "maxPrice": null }
    }
    service.searchFlights(form).subscribe(res => {
      res.forEach(route => {
        console.log("Stops equal 0 : " + route.stops);
        expect(route.stops).toEqual(0);
      });
    });
  });

  it('searchFlights() return the direct flight list ', () => {
    let form = {
      value: { "to": "", "fromDate": null, "toDate": null, "stops": "1", "minPrice": 0, "maxPrice": null }
    }
    service.searchFlights(form).subscribe(res => {
      res.forEach(route => {
        console.log("Stops less than or equal 1: " + route.stops);
        expect(route.stops).toBeLessThanOrEqual(1);
      });
    });
  });

  it('searchFlights() return the flight list between 100 and 300 price', () => {
    let form = {
      value: { "to": "", "fromDate": null, "toDate": null, "stops": null, "minPrice": 100, "maxPrice": 300 }
    }
    service.searchFlights(form).subscribe(res => {
      res.forEach(route => {
        console.log("flights with price between 100 $ and 300 $: " + route.price);
        expect(route.price).toBeGreaterThanOrEqual(100);
        expect(route.price).toBeLessThanOrEqual(300);
      });
    });
  });

  it('searchFlights() return the flight list with max price 400 $', () => {
    let form = {
      value: { "to": "", "fromDate": null, "toDate": null, "stops": null, "minPrice": null, "maxPrice": 300 }
    }
    service.searchFlights(form).subscribe(res => {
      res.forEach(route => {
        console.log("flights with max price 400: " + route.price);
        expect(route.price).toBeLessThanOrEqual(400);
      });
    });
  });

  it('searchFlights() return the flight list with combine parameters', () => {
    let form = {
      value: { "to": "LIS", "fromDate": null, "toDate": null, "stops": "0", "minPrice": null, "maxPrice": 300 }
    }
    service.searchFlights(form).subscribe(res => {
      res.forEach(route => {
        console.log("flights with max price 400: " + route.price);
        expect(route.price).toBeLessThanOrEqual(300);
          console.log("Stops equal 0: " + route.stops);
        expect(route.stops).toEqual(0);
        console.log("Destination: " + route.flights[route.flights.length - 1].destination.iata);
        expect(route.flights[route.flights.length - 1].destination.iata).toEqual("LIS");
      });
    });
  });

  it('sortFlightsByStops()', () => {
    let form = {
      value: { "to": null, "fromDate": null, "toDate": null, "stops": null, "minPrice": null, "maxPrice": null }
    }
    service.searchFlights(form).subscribe(res => {
      service.sortFlightsByStops();
      let arr = service.flightsSearchResult;
      for (let i = 0; i < arr.length - 1; i++) {
        console.log(arr[i].stops);
        expect(arr[i].stops).toBeLessThanOrEqual(arr[i + 1].stops);
      }
    });
  });

  it('sortFlightsByDuration()', () => {
    let form = {
      value: { "to": null, "fromDate": null, "toDate": null, "stops": null, "minPrice": null, "maxPrice": null }
    }
    service.searchFlights(form).subscribe(res => {
      service.sortFlightsByDuration();
      let arr = service.flightsSearchResult;
      for (let i = 0; i < arr.length - 1; i++) {
        console.log(arr[i].duration.timeMS);
        expect(arr[i].duration.timeMS).toBeLessThanOrEqual(arr[i + 1].duration.timeMS);
      }
    });
  });

  it('sortFlightsByDuration()', () => {
    let form = {
      value: { "to": null, "fromDate": null, "toDate": null, "stops": null, "minPrice": null, "maxPrice": null }
    }
    service.searchFlights(form).subscribe(res => {
      service.sortFlightsByPrice();
      let arr = service.flightsSearchResult;
      for (let i = 0; i < arr.length - 1; i++) {
        console.log(arr[i].price);
        expect(arr[i].price).toBeLessThanOrEqual(arr[i + 1].price);
      }
    });
  });


  it('initMap()', () => {
    service.initMap();
    expect(service.flightsMap.size).toBeGreaterThan(0);
    service.flights.forEach(node => {
      service.flightsMap.get(node.origin.iata).flights.forEach(
        flight => { expect(flight.origin.iata).toEqual(node.origin.iata) }
      )
    });
  });

  it('the route is correct', () => {
    service.initMap();
    expect(service.flightsMap.size).toBeGreaterThan(0);
    let keys = service.flightsMap.forEach((value, key) => {
      service.flightsMap.get(key).routes.forEach(route => {
        let flights = route.flights;
        for (let i = 0; i < flights.length - 1; i++) {
          expect(flights[i].destination.iata).toEqual(flights[i + 1].origin.iata);
        }
        expect(flights[flights.length - 1].destination.iata).toEqual(key);
      });
    })
  });

  it('airports are once', () => {
    let keys = service.flightsMap.forEach((value, key) => {
      service.flightsMap.get(key).routes.forEach(route => {
        let flights = route.flights;
        let countAirports: Map<string, number> = new Map<string, number>();
        let airport: string;
        for (let i = 0; i < flights.length - 1; i++) {
          airport = flights[i].destination.iata;
          if (!countAirports.get(airport)) {
            countAirports.set(airport, 0);
          }
          countAirports.set(airport, countAirports.get(airport) + 1);
        }
        countAirports.forEach((value, key) => {
          console.log("key" + key +" "+ value);
          expect(value).toEqual(1);
        })
      });
    });
  });

});
