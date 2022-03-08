import {Component, OnInit} from '@angular/core';
import {ListArticlesService} from "../partage/service/list-articles.service";
import {Article} from "../model/Article";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {mergeMap} from "rxjs";
import {AjoutPopupComponent} from "./ajout-popup/ajout-popup.component";

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.scss']
})
export class ListArticlesComponent implements OnInit {

  articles: Article[] = [];
  view:string = "card";
  dialogStatus: string = "inactive";
  private addDialog: MatDialogRef<AjoutPopupComponent> | any;

  constructor( private readonly listArticlesService: ListArticlesService, public dialog: MatDialog) {
    //Rien à faire ici
  }

  ngOnInit(): void {
    this.listArticlesService.fetch().subscribe(articles => {
      this.articles = articles || [];
    });
  }

  delete(article: Article) {
    this.listArticlesService.delete(article.id!).subscribe(articles => {
      this.articles = articles;
    });
  }

  switchView() {
    if(this.view==="card"){
      this.view = "list"
    }
    else{
      this.view = "card";
    }
  }

  add(article: Article) {
    this.listArticlesService
      .create(article)
      .pipe(mergeMap(() => this.listArticlesService.fetch()))
      .subscribe(articles => {
        this.articles = articles;
        this.hideDialog();
      });
  }

  update(article: Article) {
    this.listArticlesService
      .update(article)
      .pipe(mergeMap(() => this.listArticlesService.fetch()))
      .subscribe(articles => {
        this.articles = articles;
        this.hideDialog();
      });
  }

  showDialog() {
    debugger;
    this.dialogStatus = 'active';
    this.addDialog = this.dialog.open(AjoutPopupComponent, {
      width: '600px',
      data: {}
    });

    this.addDialog.afterClosed().subscribe((article:any)=> {
      this.dialogStatus = 'inactive';
      if (article) {
        this.add(article);
      }
    });
  }

  hideDialog() {
    this.dialogStatus = 'inactive';
    if(this.addDialog != undefined){
      this.addDialog.close();
    }
  }
}
