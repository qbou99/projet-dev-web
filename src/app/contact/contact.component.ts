import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements AfterViewInit {


  @ViewChild("name") name: ElementRef<HTMLElement> | undefined;
  @ViewChild("adresse") adresse: ElementRef<HTMLElement> | undefined;

  constructor() {
    //Vide

  }

  ngAfterViewInit(): void {
    this.name!.nativeElement!.innerHTML = "Johann et Quentin";
    this.adresse!.nativeElement!.innerHTML = "DuoDeChoc@mimfornight.com";
    }

}
