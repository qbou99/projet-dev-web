import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Article} from "../../model/Article";

@Component({
  selector: 'carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})
export class CarteComponent {

  @Input() article: Article | undefined;

  @Output('articleDelete') delete$: EventEmitter<any> = new EventEmitter();

  @Output('articleUpdate') update$: EventEmitter<any> = new EventEmitter();


  constructor() {
    //Empty
  }

  delete() {
    this.delete$.emit(this.article);
  }

  update() {
    this.update$.emit(this.article);
  }
}
