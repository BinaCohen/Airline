import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ShowFlightsComponent } from './show-flights.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

describe('ShowFlightsComponent', () => {
  let component: ShowFlightsComponent;
  let fixture: ComponentFixture<ShowFlightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShowFlightsComponent],
      imports: [HttpClientModule, MatToolbarModule, MatCardModule],
      providers: [DatePipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFlightsComponent);
    component = fixture.componentInstance;
    spyOn(component, 'sortByStops');
    spyOn(component, 'sortByDuration');
    spyOn(component, 'sortByPrice');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sort flights by stops', () => {
    component.sortByStops();
    expect(component.sortByStops).toHaveBeenCalled();
  });

  it('sort flights by duration', () => {
    component.sortByDuration();
    expect(component.sortByDuration).toHaveBeenCalled();
  });

  it('sort flights by price', () => {
    component.sortByPrice();
    expect(component.sortByPrice).toHaveBeenCalled();
  });
});
