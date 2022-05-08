import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EntriesListComponent} from "./entries-list/entries-list.component";
import {EntryFormComponent} from "./entry-form/entry-form.component";

const routes: Routes = [
  {path:'' , pathMatch:'full' , component:EntriesListComponent},
  {path:'new' , pathMatch:'full' , component:EntryFormComponent},
  {path:':id/edit' , pathMatch:'full' , component:EntryFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntriesRoutingModule { }
