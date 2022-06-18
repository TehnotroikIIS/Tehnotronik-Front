import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsribeComponent } from './subsribe.component';

describe('SubsribeComponent', () => {
  let component: SubsribeComponent;
  let fixture: ComponentFixture<SubsribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubsribeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
