import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup , Validators} from "@angular/forms";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  formGroup!:FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.formGroup = new FormBuilder().group({
      name:[null,Validators.min(2)],
      description:[null]
    })
  }

}
