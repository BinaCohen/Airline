import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowFlightsComponent } from './components/show-flights/show-flights.component';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';

const routes: Routes = [{ path: "", component: FlightSearchComponent }
  , {path: "show-flights",component: ShowFlightsComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
