import { Component, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-favorited',
  templateUrl: './favorited.component.html',
  styleUrls: ['./favorited.component.css']
})
export class FavoritedComponent implements OnInit {
  faStar = faStar;

  constructor() { }

  ngOnInit() {
  }

}
