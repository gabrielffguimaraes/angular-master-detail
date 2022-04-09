import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoriesListComponent} from "./categories-list/categories-list.component";
import {CategoryFormComponent} from "./category-form/category-form.component";

const routes: Routes = [
  {path:'' , pathMatch:'full' , component:CategoriesListComponent},
  {path:'new' , pathMatch:'full' , component:CategoryFormComponent},
  {path:':id/edit' , pathMatch:'full' , component:CategoryFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
