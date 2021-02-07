import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogWindowsComponent } from './dialog-windows.component';

describe('DialogWindowsComponent', () => {
  let component: DialogWindowsComponent;
  let fixture: ComponentFixture<DialogWindowsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogWindowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogWindowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
