import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UkraineMapComponent } from './ukraine-map.component';

describe('UkraineMapComponent', () => {
  let component: UkraineMapComponent;
  let fixture: ComponentFixture<UkraineMapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UkraineMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UkraineMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
