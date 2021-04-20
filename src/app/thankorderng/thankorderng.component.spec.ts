import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankorderngComponent } from './thankorderng.component';

describe('ThankorderngComponent', () => {
  let component: ThankorderngComponent;
  let fixture: ComponentFixture<ThankorderngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThankorderngComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankorderngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
