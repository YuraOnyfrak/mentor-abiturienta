import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchMentorComponent } from './search-mentor.component';

describe('SearchMentorComponent', () => {
  let component: SearchMentorComponent;
  let fixture: ComponentFixture<SearchMentorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMentorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
