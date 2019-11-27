import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotsAnimationComponent } from './slots-animation.component';

describe('SlotsAnimationComponent', () => {
  let component: SlotsAnimationComponent;
  let fixture: ComponentFixture<SlotsAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotsAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotsAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
