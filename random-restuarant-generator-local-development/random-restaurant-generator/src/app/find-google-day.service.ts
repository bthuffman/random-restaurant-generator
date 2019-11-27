import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FindGoogleDayService {
googleDay: number;

  constructor() { }

  getGoogleDay() {
    const day = new Date();
    const today = day.getDay();

    // translate day value from JS to Google API numbers
    if (today === 0) {
      const googleDay = 6;
      return googleDay;
      } else {
      const googleDay = today - 1;
      return googleDay;
      }
    }
  }
