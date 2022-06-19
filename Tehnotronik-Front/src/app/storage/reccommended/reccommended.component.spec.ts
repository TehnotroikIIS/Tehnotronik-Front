import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReccommendedComponent } from './reccommended.component';

describe('ReccommendedComponent', () => {
  let component: ReccommendedComponent;
  let fixture: ComponentFixture<ReccommendedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReccommendedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReccommendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
