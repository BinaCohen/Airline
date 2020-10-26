import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FlightSearchComponent } from './flight-search.component';
import { DatePipe } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlightsService } from '../../services/flights.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ShowFlightsComponent } from '../show-flights/show-flights.component';

describe('FlightSearchComponent', () => {
  let component: FlightSearchComponent;
  let fixture: ComponentFixture<FlightSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        
        RouterTestingModule.withRoutes([{ path: "show-flights", component: ShowFlightsComponent }]),
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule
        ],
      declarations: [FlightSearchComponent],
      providers: [DatePipe],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onNewSearchTerm() ', () => {
    component.onNewSearchTerm("tl");
    expect(component.airports.length).toEqual(0);
  });

  it('should go to url',
    async (inject([Location], async ( location: Location) => {

      await component.SearchFlights();
      console.log(location.path());
      expect(location.path()).toEqual('/show-flights');

    })));

});
