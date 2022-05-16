import { Component, OnInit } from '@angular/core';
import { CategoryService } from "../shared/category.service";
import { Category } from "../shared/category.model";

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  categories!: Category[] ;
  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories,
      error => console.log(error)
    )
  }

  deleteCategory(category:Category) {
    if(confirm("Deseja realmente excluir ?")) {
      this.categoryService.delete(category.id).subscribe(
        () => this.categories = this.categories.filter(element => element != category),
        () => alert("Erro ao deletar categoria")
      );
    }
  }

}
