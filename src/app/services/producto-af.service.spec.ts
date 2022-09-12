import { TestBed } from '@angular/core/testing';

import { ProductoAfService } from './producto-af.service';

describe('ProductoAfService', () => {
  let service: ProductoAfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoAfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
