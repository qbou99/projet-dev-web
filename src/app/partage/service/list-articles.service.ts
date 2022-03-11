import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {Article} from "../../model/Article";


@Injectable({
  providedIn: 'root'
})
export class ListArticlesService {

  private articles = new BehaviorSubject<string>('');

  private urlServer:any = {};

  constructor(private readonly http: HttpClient) {

    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls

    Object.keys(environment.backend.endpoints).forEach(
      // @ts-ignore
      k => (this.urlServer[k] = `${baseUrl}${environment.backend.endpoints[k]}`)
    );
    console.log(this.urlServer);

  }

  get articles$(): Observable<string> {
    return this.articles.asObservable();
  }

  updatedArticleeList(data: string){
    this.articles.next(data);
  }

  fetch(): Observable<Article[]> {
    return this.http.get<Article[]>(this.urlServer.tousLesArticles);
  }

  search(name: string): Observable<Article[]> {
    return this.http.get<Article[]>(this.urlServer.filterByName.replace(':name', name));
  }

  delete(_id: string): Observable<any> {
    return this.http.delete(this.urlServer.unArticle.replace(':id', _id));
  }

  create(article: Article): Observable<Article> {
    return this.http.post<Article>(this.urlServer.tousLesArticles, article);
  }

  fetchOne(_id: string): Observable<Article> {
    return this.http.get<Article>(this.urlServer.unArticle.replace(':id', _id));
  }

  update(article: Article): Observable<Article> {
    return this.http.put<Article>(this.urlServer.unArticle.replace(':id', article._id), article);
  }
}
