import { GoogleMapsComponent } from './../google-maps/google-maps.component';
import { Component } from '@angular/core';
import { trigger, state, transition, animate, style, keyframes } from '@angular/animations';

@Component({
  selector: 'app-slots-animation',
  templateUrl: './slots-animation.component.html',
  styleUrls: ['./slots-animation.component.css'],
  animations: [
    trigger('cardSpinner', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      state('out', style({ opacity: 0, display: 'none', transform: 'translateY(-100%)' })),
      transition('in => out', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('0.1s', style({ transform: 'translateY(-100%)', opacity: 0 }))
      ]),
      transition('out => in', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('0.1s', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('openClose', [
      state('open', style({
        height: '52px',
      })),
      state('closed', style({
        height: '52px',
      })),
      transition('* => *', [
        animate('1s', keyframes([
          style({ offset: 0.33, transform: 'translateY(15px)' }),
          style({ offset: 1, transform: 'translateY(0px)' })
        ]))
      ]),
    ]),
  ]
})
export class SlotsAnimationComponent {

  isOpen = true;

  currentIndex = 0;
  intervalInstance;
  cards = [
    { value: 'Apple Pie', state: 'out', color: '#F44336' },
    { value: 'Hamburger', state: 'in', color: '#E91E63' },
    { value: 'Clam Chowder', state: 'out', color: '#9C27B0' },
    { value: 'Bagel', state: 'out', color: '#673AB7' },
    { value: 'Pizza', state: 'out', color: '#3F51B5' },
    { value: 'Texas BBQ', state: 'out', color: '#2196F3' },
    { value: 'Chicken Wings', state: 'out', color: '#03A9F4' },
    { value: 'Reuben', state: 'out', color: '#00BCD4' },
    { value: 'Hot Dogs', state: 'out', color: '#009688' },
    { value: 'Eggs Benedict', state: 'out', color: '#4CAF50' }
  ];

  currentIndex1 = 0;
  intervalInstance1;
  card1s = [
    { value: 'Nachos', state: 'out', color: '#F44336' },
    { value: 'Sushi', state: 'out', color: '#E91E63' },
    { value: 'Cobbler', state: 'out', color: '#9C27B0' },
    { value: 'Pad Thai', state: 'out', color: '#673AB7' },
    { value: 'Green Chile', state: 'out', color: '#3F51B5' },
    { value: 'Frito Pie', state: 'out', color: '#2196F3' },
    { value: 'Salmon', state: 'out', color: '#03A9F4' },
    { value: 'BLT', state: 'out', color: '#00BCD4' },
    { value: 'BBQ Ribs', state: 'out', color: '#009688' },
    { value: 'Indian Frybread', state: 'in', color: '#4CAF50' }
  ];

  currentIndex2 = 0;
  intervalInstance2;
  card2s = [
    { value: 'Lobster Rolls', state: 'out', color: '#F44336' },
    { value: 'Tacos', state: 'out', color: '#E91E63' },
    { value: 'Enchiladas', state: 'in', color: '#9C27B0' },
    { value: 'Crabcakes', state: 'out', color: '#673AB7' },
    { value: 'Macaroni', state: 'out', color: '#3F51B5' },
    { value: 'Red Curry', state: 'out', color: '#2196F3' },
    { value: 'Jambalaya', state: 'out', color: '#03A9F4' },
    { value: 'Fajitas', state: 'out', color: '#00BCD4' },
    { value: 'Tater Tots', state: 'out', color: '#009688' },
    { value: 'Key Lime Pie', state: 'out', color: '#4CAF50' }
  ];

  constructor(
    private googleMapsComponent: GoogleMapsComponent
  ) { }

  scroll(el: HTMLElement) {
    setTimeout(() => {
    el.scrollIntoView();
  }, 1000);
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.googleMapsComponent.randomSelection();
    this.animateSpin();
  }

  animateSpin() {
    this.cards.forEach(card => card.state = 'out');
    this.currentIndex = 0;
    this.cards[this.currentIndex].state = 'in';

    this.intervalInstance = setInterval(() => {
      this.currentIndex++;
      if (this.currentIndex === this.cards.length) {
        this.currentIndex = 0;
      }
      if (this.currentIndex !== 0) {
        this.cards[this.currentIndex - 1].state = 'out';
      } else {
        this.cards[this.cards.length - 1].state = 'out';
      }
      this.cards[this.currentIndex].state = 'in';
    }, 100);

    const itemIndex = Math.floor((Math.random() * ((this.cards.length * 5) - this.cards.length)) + this.cards.length);
    setTimeout(() => {
      clearInterval(this.intervalInstance);
      const randomCard = this.cards.filter(card => card.state === 'in');
    }, itemIndex * 10);

    // 2nd Slot
    this.card1s.forEach(card1 => card1.state = 'out');
    this.currentIndex1 = 0;
    this.card1s[this.currentIndex1].state = 'in';

    this.intervalInstance1 = setInterval(() => {
      this.currentIndex1++;
      if (this.currentIndex1 === this.card1s.length) {
        this.currentIndex1 = 0;
      }
      if (this.currentIndex1 !== 0) {
        this.card1s[this.currentIndex1 - 1].state = 'out';
      } else {
        this.card1s[this.card1s.length - 1].state = 'out';
      }
      this.card1s[this.currentIndex1].state = 'in';
    }, 100);

    const itemIndex1 = Math.floor((Math.random() * ((this.card1s.length * 5) - this.card1s.length)) + this.card1s.length);
    setTimeout(() => {
      clearInterval(this.intervalInstance1);
      const randomCard1 = this.card1s.filter(card1 => card1.state === 'in');
    }, itemIndex1 * 10);

    // 3rd Slot
    this.card2s.forEach(card2 => card2.state = 'out');
    this.currentIndex2 = 0;
    this.card2s[this.currentIndex2].state = 'in';

    this.intervalInstance2 = setInterval(() => {
      this.currentIndex2++;
      if (this.currentIndex2 === this.card2s.length) {
        this.currentIndex2 = 0;
      }
      if (this.currentIndex2 !== 0) {
        this.card2s[this.currentIndex2 - 1].state = 'out';
      } else {
        this.card2s[this.card2s.length - 1].state = 'out';
      }
      this.card2s[this.currentIndex2].state = 'in';
    }, 100);

    const itemIndex2 = Math.floor((Math.random() * ((this.card2s.length * 5) - this.card2s.length)) + this.card2s.length);
    setTimeout(() => {
      clearInterval(this.intervalInstance2);
      const randomCard2 = this.card2s.filter(card2 => card2.state === 'in');
    }, itemIndex2 * 10);
  }
}
