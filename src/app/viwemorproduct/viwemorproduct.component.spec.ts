import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViwemorproductComponent } from './viwemorproduct.component';

describe('ViwemorproductComponent', () => {
  let component: ViwemorproductComponent;
  let fixture: ComponentFixture<ViwemorproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViwemorproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViwemorproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
