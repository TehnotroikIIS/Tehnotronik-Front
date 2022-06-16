import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployedMenuComponent } from './employed-menu.component';

describe('EmployedMenuComponent', () => {
  let component: EmployedMenuComponent;
  let fixture: ComponentFixture<EmployedMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployedMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployedMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
