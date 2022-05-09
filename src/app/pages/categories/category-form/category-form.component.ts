import { Component, OnInit, AfterContentChecked } from '@angular/core';
import {FormBuilder, FormGroup , Validators} from "@angular/forms";
import {Category} from "../shared/category.model";
import {CategoryService} from "../shared/category.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import {EMPTY, of} from "rxjs";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit,AfterContentChecked {
  formGroup!:FormGroup;
  currentAction!: string;
  pageTitle!: string;
  serverErroMessages!: string[];
  submittingForm: boolean = false;
  category:Category = new Category();

  constructor(private categoryService:CategoryService,private route:ActivatedRoute,private router:Router,) { }

  ngOnInit(): void {
    /*FACTORY*/
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
    this.formGroup = new FormBuilder().group({
      name:[null,Validators.min(2)],
      description:[null]
    })
  }
  // PRIVATE
  private setCurrentAction():void {
    // @ts-ignore
    this.route.paramMap
      .pipe(
        switchMap(params => (params.has('id')) ? this.categoryService.getById(parseInt(<string>params.get('id'))) : EMPTY),
      ).subscribe((category:Category) => {
          console.log(category);
      }, (error) => {
          console.log(error);
      }, () => {

      });
  }
  private buildCategoryForm():void {

  }
  private loadCategory():void {

  }

  ngAfterContentChecked(): void {
  }
}
