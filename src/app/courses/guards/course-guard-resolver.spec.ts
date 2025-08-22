import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { courseGuardResolver } from './course-guard-resolver';

describe('courseGuardResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => courseGuardResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
