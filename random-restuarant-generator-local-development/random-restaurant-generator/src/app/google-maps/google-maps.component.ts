import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { FindGoogleDayService } from '../find-google-day.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})

export class GoogleMapsComponent implements OnInit {
  faStar = faStar;
  panelOpenState = false;

  zoom: number;
  autoService: google.maps.places.Autocomplete;


  // details about restaurant
  photoOpts = {
    'maxHeight': 200
  };
  photo: any;
  latitude: number;
  longitude: number;
  address: string;
  name: string;
  id: string;
  details: any;
  phoneNumber: string;
  website: string;
  ratings: number;
  // review variables
  review;
  reviewAspectRating;
  reviewAuthor: string;
  reviewAuthorUrl: string;
  reviewText: string;
  // OpeningHours interface
  open: boolean;
  isOpen: any;
  openTime: string;
  weekday: string;
  weekdays: string[];

  // These variables are for the random selection of a restaurant
  // This section is for the nearby search
  service: any;
  newService: google.maps.places.PlacesService;

  request = {
    location: {
      lat: 35.096887,
      lng: -106.654439
    },
    radius: 50000,
    keyword: 'food'
  };
  googlesDay: number;
  // This section is for the details results
  detailsRequest: google.maps.places.PlaceDetailsRequest;
  newResults: any;
  nearbyResults: any;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  @ViewChild('randomButton')
  public randomElementRef: ElementRef;

  private geoCoder;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private googleDayService: FindGoogleDayService,
  ) { }

  passAddress() {
    this.copyText(this.name);
  }

  /* To copy any Text */
  copyText(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  goToGoogleSite() {
    window.location.href = 'https://www.google.com/maps/';
  }

  ngOnInit() {
    this.googlesDay = this.googleDayService.getGoogleDay();

    this.mapsAPILoader.load().then(() => {

      this.geoCoder = new google.maps.Geocoder;

      // This is the latitude and longitude of 10 miles 0.14492753623
      const tenMileLatLong = 0.14492753623;

      const defaultBounds = new google.maps.LatLngBounds(
        {
          lat: this.latitude - tenMileLatLong,
          lng: this.longitude - tenMileLatLong
        },
        {
          lat: this.latitude + tenMileLatLong,
          lng: this.longitude + tenMileLatLong
        });

      const options = {
        bounds: defaultBounds,
        types: ['establishment']
      };

      const input = this.searchElementRef.nativeElement;

      const autoService = new google.maps.places.Autocomplete(input, options);

      autoService.addListener('place_changed', () => {
        this.ngZone.run(() => {

          const place: google.maps.places.PlaceResult = autoService.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }


          this.photo = place.photos[0].getUrl(this.photoOpts);
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.name = place.name;
          this.ratings = place.rating;
          this.id = place.place_id;
          this.address = place.formatted_address;
          this.phoneNumber = place.formatted_phone_number;
          this.website = place.website;
          this.open = place.opening_hours.open_now;
          this.opened(this.open);
          this.weekday = place.opening_hours.weekday_text[this.googlesDay];
          this.weekdays = place.opening_hours.weekday_text;
          this.reviewAuthor = place.reviews[0].author_name;
          this.reviewAuthorUrl = place.reviews[0].author_url;
          this.review = place.reviews[0];
          this.reviewText = place.reviews[0].text;
          this.reviewAspectRating = this.review.rating;
        });
      });
      this.setCurrentLocation(autoService);
    });
  }

  public startServices() {
    this.newService = new google.maps.places.PlacesService(this.randomElementRef.nativeElement);
    return this.newService;
  }

  public opened(open: boolean) {
    if (open === true) {
      this.openTime = 'Open';
    } else if (open === false) {
      this.openTime = 'Closed';
    } else {
      console.log('There is an error or this location doesn\'t have an open_now value as part of the PlaceResults[].');
    }
  }

  public markerDragEnd($event: MouseEvent) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  public getAddress(latitude: number, longitude: number) {
    this.ngZone.run(() => {
      this.geoCoder.geocode({
        'location': {
          lat: latitude,
          lng: longitude
        }
      },
        (results: { formatted_address: string; }[], status: string) => {

          if (status === 'OK') {
            if (results[0]) {
              this.address = results[0].formatted_address;
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
    });
  }

  public randomSelection() {
    this.startServices();
    this.newService.nearbySearch(this.request, (result, status) => this.nearbyCallback(result, status));
  }

  public nearbyCallback(nearbyResults: google.maps.places.PlaceResult[],
    nearbyStatus: google.maps.places.PlacesServiceStatus) {
    this.ngZone.run(() => {
      if (nearbyStatus === google.maps.places.PlacesServiceStatus.OK) {

        const max = nearbyResults.length - 1;

        const randomNumber = Math.floor(Math.random() * Math.floor(max));

        const service = nearbyResults[randomNumber];

        this.name = service.name;
        this.id = service.place_id;

        this.detailsRequest = {
          placeId: this.id
        };

        this.newService.getDetails(
          this.detailsRequest,
          (result, status) => { this.detailsCallback(result, status); }
        );

        this.latitude = service.geometry.location.lat();
        this.longitude = service.geometry.location.lng();
        this.getAddress(this.latitude, this.longitude);
      }
    });
  }

  public detailsCallback(results: google.maps.places.PlaceResult,
    status: google.maps.places.PlacesServiceStatus) {
    this.ngZone.run(() => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const newResults = results;
        this.photo = newResults.photos[0].getUrl(this.photoOpts);
        this.name = newResults.name;
        this.ratings = newResults.rating;
        this.id = newResults.place_id;
        this.address = newResults.formatted_address;
        this.phoneNumber = newResults.formatted_phone_number;
        this.website = newResults.website;
        this.open = newResults.opening_hours.open_now;
        this.opened(this.open);
        this.weekday = newResults.opening_hours.weekday_text[this.googlesDay];
        this.weekdays = newResults.opening_hours.weekday_text;
        this.reviewAuthor = newResults.reviews[0].author_name;
        this.reviewAuthorUrl = newResults.reviews[0].author_url;
        this.reviewText = newResults.reviews[0].text;
        this.review = newResults.reviews[0];
        this.reviewAspectRating = this.review.rating;
      } else {
        console.log('It broke at the details callback, places service status is not ok.', status);
      }
    });
  }

  private setCurrentLocation(service: google.maps.places.Autocomplete) {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 14;
        this.getAddress(this.latitude, this.longitude);
        const geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        const circle = new google.maps.Circle(
          { center: geolocation, radius: position.coords.accuracy });
        service.setBounds(circle.getBounds());
      });
    }
  }

}
