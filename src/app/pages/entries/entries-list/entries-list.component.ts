import { Component, OnInit } from '@angular/core';
import { EntryService } from "../shared/entry.service";
import { Entry } from "../shared/entry.model";

@Component({
  selector: 'app-entries-list',
  templateUrl: './entries-list.component.html',
  styleUrls: ['./entries-list.component.css']
})
export class EntriesListComponent implements OnInit {
  entries!: Entry[] ;
  constructor(private entryService:EntryService) { }

  ngOnInit(): void {
    this.entryService.getAll().subscribe(
      entries => this.entries = entries,
      error => console.log(error)
    )
  }
  deleteEntry(entry:Entry) {
    if(confirm("Deseja realmente excluir ?")) {
      this.entryService.delete(entry.id).subscribe(
        () => this.entries = this.entries.filter(element => element != entry),
        () => alert("Erro ao deletar categoria")
      );
    }
  }

}
