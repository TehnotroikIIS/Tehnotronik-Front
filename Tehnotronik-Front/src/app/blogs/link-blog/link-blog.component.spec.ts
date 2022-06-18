import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkBlogComponent } from './link-blog.component';

describe('LinkBlogComponent', () => {
  let component: LinkBlogComponent;
  let fixture: ComponentFixture<LinkBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
