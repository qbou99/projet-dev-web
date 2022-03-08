import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ListArticlesService} from "../../partage/service/list-articles.service";
import {Article} from "../../model/Article";

@Component({
  selector: 'app-edition',
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.scss']
})
export class EditionComponent implements OnInit {

  article: Article;

  /**
   * Component constructor
   */
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly listArticlesService: ListArticlesService
  ) {
    this.article = {};
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this.route.data.subscribe(( article: any) => (this.article = article.article));
  }

  submit(article: any) {
    this.listArticlesService.update(article).subscribe(() => {
      this.router.navigate(['/listArticles']).then(r => null);
    });
  }

  cancel() {
    this.router.navigate(['/listArticles']).then(r => null);
  }

}
