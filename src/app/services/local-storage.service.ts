import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  // Метод для сохранения данных в localStorage
  setItem(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Метод для получения данных из localStorage
  getItem(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }


  // Метод для удаления данных из localStorage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

}
