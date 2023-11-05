import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';



describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should get item from localStorage', () => {
    const key = 'testKey';
    const data = { name: 'John', age: 25 };

    localStorage.setItem(key, JSON.stringify(data));

    const retrievedData = service.getItem(key);
    expect(retrievedData).toEqual(data);
  });

  it('should get item from localStorage', () => {
    const key = 'testKey';
    const data = { name: 'John', age: 25 };

    localStorage.setItem(key, JSON.stringify(data));

    const retrievedData = service.getItem(key);
    expect(retrievedData).toEqual(data);
  });

  it('should return null if item does not exist in localStorage', () => {
    const key = 'nonExistentKey';

    const retrievedData = service.getItem(key);
    expect(retrievedData).toBeNull();
  });

  it('should remove item from localStorage', () => {
    const key = 'testKey';
    const data = { name: 'John', age: 25 };

    localStorage.setItem(key, JSON.stringify(data));

    service.removeItem(key);

    const storedData = localStorage.getItem(key);
    expect(storedData).toBeNull();
  });
});
