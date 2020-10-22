import { Country } from '../models/country';
import { State } from '../models/state';

export class Airport {
  city: string;
  country: Country;
  iata: string;
  label: string;
  name: string;
  state: State;

  constructor(city: string ="", country: Country = new Country(), iata: string = "", label: string = "", name: string = "", state: State = new State()) {
    this.city = city;
    this.country = new Country(country.name, country.iso);
    this.iata = iata;
    this.label = label;
    this.name = name;
    this.state = new State(state.name, state.abbr);
  }
}
