import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntriesRoutingModule } from './entries-routing.module';
import { EntriesListComponent } from './entries-list/entries-list.component';
import { EntryFormComponent } from './entry-form/entry-form.component';

@NgModule({
  declarations: [
    EntriesListComponent,
    EntryFormComponent
  ],
  imports: [
    CommonModule,
    EntriesRoutingModule
  ]
})
export class EntriesModule { }
