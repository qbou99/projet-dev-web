import {Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from '@angular/core';
import {Article} from "../../model/Article";

@Directive({
  selector: '[badgeChef]'
})
export class BadgeChefDirective implements OnInit, OnChanges{
  @Input() article: Article = {};

  constructor(private elementRef:ElementRef, private renderer:Renderer2) {
    debugger;
  }

  ngOnInit(): void {
    let isChef:boolean = false;
    this.article?.titres?.forEach((titre) => {
      if(titre.includes("chef")){
        isChef = true;
        this.renderer.setProperty(
          this.elementRef.nativeElement,
          'innerHTML',
          '<em class="material-icons">supervisor_account</em>'
        );
        return;
      }
    })
    if(!isChef)
    this.renderer.setProperty(this.elementRef.nativeElement,'innerHTML','');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }
}
