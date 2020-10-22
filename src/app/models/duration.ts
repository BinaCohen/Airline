export class Duration {
  days: number;
  hours: number;
  minutes: number;
  timeMS: number;
  constructor(DepartureDate?: Date, LandingDate?: Date) {
    if (DepartureDate) {
      this.timeMS = (LandingDate.getTime() - DepartureDate.getTime()); // milliseconds between DepartureDate & LandingDate
      this.days = Math.floor(this.timeMS / 86400000); // days
      this.hours = Math.floor((this.timeMS % 86400000) / 3600000); // hours
      this.minutes = Math.round(((this.timeMS % 86400000) % 3600000) / 60000); // minutes
      
    }
    else {
      this.days = 0;
      this.hours = 0;
      this.minutes = 0;
      this.timeMS = 0;
    }
  }
}
