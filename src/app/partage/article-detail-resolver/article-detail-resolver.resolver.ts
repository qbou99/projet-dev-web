import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ListArticlesService} from "../service/list-articles.service";
import {Article} from "../../model/Article";

@Injectable({
  providedIn: 'root'
})
export class ArticleDetailResolverResolver implements Resolve<Article> {

  constructor(private readonly peopleService: ListArticlesService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article> {
    const articleId: string | null = route.paramMap.get('id');
    if(articleId != null){
      return this.peopleService.fetchOne(articleId);
    }
    else
      return new Observable<Article>();
  }
}
