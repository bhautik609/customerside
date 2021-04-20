import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerchpageComponent } from './serchpage.component';

describe('SerchpageComponent', () => {
  let component: SerchpageComponent;
  let fixture: ComponentFixture<SerchpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SerchpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SerchpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
