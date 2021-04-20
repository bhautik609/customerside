import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductdisplaybycatComponent } from './productdisplaybycat.component';

describe('ProductdisplaybycatComponent', () => {
  let component: ProductdisplaybycatComponent;
  let fixture: ComponentFixture<ProductdisplaybycatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductdisplaybycatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductdisplaybycatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
