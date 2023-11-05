import {Component, NgModule, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {LocalStorageService} from "../../services/local-storage.service";


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule],
  standalone: true,
})
export class UserFormComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private useLocalStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    const savedData = this.useLocalStorage.getItem('userForm');
    this.userForm = this.formBuilder.group({
      phone: [savedData?.phone || '', [Validators.required, Validators.pattern(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/)]],
      email: [savedData?.email || '', [Validators.required, Validators.email]]
    });
  }

  userForm = this.formBuilder.group({
    phone: ['', [Validators.required, Validators.pattern(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/)]],
    email: ['', [Validators.required, Validators.email]]
  })


  onSubmit(): void {
    if (this.userForm.get('phone')?.valid && this.userForm.get('email')?.valid) {
      const formData = {
        phone: this.userForm.get('phone')?.value,
        email: this.userForm.get('email')?.value
      };
      this.useLocalStorage.setItem('userForm', formData);
      console.log(JSON.stringify(formData));
    }
  }


}
