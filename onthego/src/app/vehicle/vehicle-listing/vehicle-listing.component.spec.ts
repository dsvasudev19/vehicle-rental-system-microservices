import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleListingComponent } from './vehicle-listing.component';

describe('VehicleListingComponent', () => {
  let component: VehicleListingComponent;
  let fixture: ComponentFixture<VehicleListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
