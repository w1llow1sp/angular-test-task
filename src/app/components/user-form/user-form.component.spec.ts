import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { UserFormComponent } from './user-form.component';
import { LocalStorageService } from '../../services/local-storage.service';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;

  beforeEach(async () => {
    const localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', ['getItem', 'setItem']);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule
      ],
      providers: [
        FormBuilder,
        { provide: LocalStorageService, useValue: localStorageServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    localStorageService = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with saved data if available', () => {
    const savedData = { phone: '+7 (123) 456-78-90', email: 'test@example.com' };
    localStorageService.getItem.and.returnValue(savedData);

    component.ngOnInit();

    expect(component.userForm.value).toEqual(savedData);
  });

  it('should initialize the form with empty values if no saved data available', () => {
    localStorageService.getItem.and.returnValue(null);

    component.ngOnInit();

    expect(component.userForm.value).toEqual({ phone: '', email: '' });
  });

  it('should set the form values and save data to local storage when submitted with valid input', () => {
    const formData = { phone: '+7 (123) 456-78-90', email: 'test@example.com' };
    component.userForm.setValue(formData);

    component.onSubmit();

    expect(component.userForm.valid).toBeTrue();
    expect(localStorageService.setItem).toHaveBeenCalledWith('userForm', formData);
  });

  it('should not save data to local storage when submitted with invalid phone format', () => {
    const formData = { phone: '1234567890', email: 'test@example.com' };
    component.userForm.setValue(formData);

    component.onSubmit();

    expect(component.userForm.valid).toBeFalse();
    expect(localStorageService.setItem).not.toHaveBeenCalled();
  });

  it('should not save data to local storage when submitted with invalid email format', () => {
    const formData = { phone: '+7 (123) 456-78-90', email: 'test' };
    component.userForm.setValue(formData);

    component.onSubmit();

    expect(component.userForm.valid).toBeFalse();
    expect(localStorageService.setItem).not.toHaveBeenCalled();
  });



});
