import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RandomComponent} from "./random/random.component";
import {ListArticlesComponent} from "./list-articles/list-articles.component";
import {ContactComponent} from "./contact/contact.component";
import {EditionComponent} from "./list-articles/edition/edition.component";
import {ArticleDetailResolverResolver} from "./partage/article-detail-resolver/article-detail-resolver.resolver";

const routes: Routes = [
  { path: '', redirectTo: 'random', pathMatch: 'full' },
  {path:'random', component: RandomComponent},
  {path:'listArticles', component: ListArticlesComponent},
  { path: 'edit/:id', component: EditionComponent, resolve: { article: ArticleDetailResolverResolver } },
  {path:'contact', component: ContactComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
