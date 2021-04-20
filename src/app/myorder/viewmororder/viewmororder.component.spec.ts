import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmororderComponent } from './viewmororder.component';

describe('ViewmororderComponent', () => {
  let component: ViewmororderComponent;
  let fixture: ComponentFixture<ViewmororderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewmororderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewmororderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
