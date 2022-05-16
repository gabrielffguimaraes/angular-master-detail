import { Component, OnInit, AfterContentChecked } from '@angular/core';
import {FormBuilder, FormGroup , Validators} from '@angular/forms';
import {Category} from '../shared/category.model';
import {CategoryService} from '../shared/category.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';

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

  constructor(private categoryService:CategoryService,
              private route:ActivatedRoute,
              private router:Router,
              private formBuilder:FormBuilder) { }
  ngAfterContentChecked(): void {
    this.setPageTitle();
  }
  ngOnInit(): void {
    /*FACTORY*/
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }
  onSubmit(): void {
    this.submittingForm = true;
    const category:Category = Object.assign(new Category(),this.formGroup.value);
    if (this.currentAction === 'new') {
      this.categoryService.create(category).subscribe(
        (category) => {
        this.actionsForSucess(category);
      } , (error) => {
          this.actionsForError(error);
      });
    } else {
      this.categoryService.update(category).subscribe(
        (category) => {
          alert('Sucesso .');
          this.actionsForSucess(category);
        }, (error)=> {
          alert('Error .');
          this.actionsForError(category);
        }
      );
    }
  }
  // PRIVATE
  private actionsForSucess(category:Category) {
    this.router.navigateByUrl("categories",{skipLocationChange:true}).then(() => {
       this.router.navigate(["categories",category.id,"edit"])
    });
  }
  private actionsForError(error : any) {
    this.submittingForm = false;
  }
  private setPageTitle():void {
    if(this.currentAction === 'new') {
      this.pageTitle = 'Cadastro de nova Categoria';
    } else {
      const nomeCategoria = this.category.name || '';
      this.pageTitle = `Editando Categoria : ${nomeCategoria}`;
    }
  }
  private setCurrentAction():void {
    if(this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }
  private buildCategoryForm():void {
    this.formGroup = this.formBuilder.group({
      id:[null],
      name:[null,[Validators.minLength(4),Validators.required]],
      description:[null]
    });
  }
  private loadCategory():void {
    this.route.paramMap
      .pipe(
        switchMap(
          (params)=> (params.has('id') ? this.categoryService.getById(parseInt(<string>params.get('id'))):EMPTY)
        )
      ).subscribe((category:Category) => {
        this.category = category;
        this.formGroup.patchValue(this.category);
      },(error) => {
        alert('Ocorreu um erro por favor tente mais tarde .')
    });
  }

}
