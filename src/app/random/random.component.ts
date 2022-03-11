import {Component} from '@angular/core';
import {Article} from "../model/Article";
import {ListArticlesService} from "../partage/service/list-articles.service";

@Component({
  selector: 'random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss']
})
export class RandomComponent {

  article: Article = {};


  constructor(private readonly listArticlesService:ListArticlesService) {
    this.random();
  }


  /**
   * Returns random people
   */
  random() {
    this.listArticlesService.fetchRandom().subscribe(article => {
      this.article = article;
    });
  }

  delete(article: Article){
    this.listArticlesService.delete(article._id!).subscribe(() => {
      this.random();
    });
  }



}
