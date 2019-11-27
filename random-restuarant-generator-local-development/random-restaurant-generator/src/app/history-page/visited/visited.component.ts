import { Component, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-visited',
  templateUrl: './visited.component.html',
  styleUrls: ['./visited.component.css']
})
export class VisitedComponent implements OnInit {
  faStar = faStar;

  constructor() { }

  ngOnInit() {
  }

}
