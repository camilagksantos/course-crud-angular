import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseOrganizeComponent } from './course-organize-component';

describe('CourseOrganizeComponent', () => {
  let component: CourseOrganizeComponent;
  let fixture: ComponentFixture<CourseOrganizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseOrganizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseOrganizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
