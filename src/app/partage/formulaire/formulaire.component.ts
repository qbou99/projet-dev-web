import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Article} from "../../model/Article";

@Component({
  selector: 'formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss']
})
export class FormulaireComponent implements OnInit {
  form: FormGroup;
  @Input() articleModel: Article;
  @ViewChild("fileInput") fileInput!: ElementRef;

  @Output('cancel') cancelEvent$: EventEmitter<any>;
  @Output('submit') submitEvent$: EventEmitter<any>;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor() {
    this.submitEvent$ = new EventEmitter();
    this.cancelEvent$ = new EventEmitter();
    this.form = FormulaireComponent.buildForm();
    this.articleModel = {
      types: []
    };
  }

  ngOnInit() {
    debugger;
    this.form.patchValue({
      _id: this.articleModel._id,
      name: this.articleModel.name,
      description: this.articleModel.description,
      types: this.articleModel.types || [],
      image: this.articleModel.image,
    });
  }

  cancel() {
    this.cancelEvent$.emit();
  }

  submit(article: Article) { //Formulaire
    article.image = this.articleModel.image;
    this.submitEvent$.emit(article);
  }


  addChipset(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.articleModel.types!.push(value);
    }
    event.chipInput!.clear();
  }

  removeChipset(type: any): void {
    const index = this.articleModel.types!.indexOf(type);
    this.articleModel.types!.splice(index, 1);
  }

  onFileSelected(event:Event | null) {
    const files = (<HTMLInputElement>event?.currentTarget).files;
    const file:File | null = files!.item(0);

    if (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
          this.articleModel.image = reader.result;
        }
    }
  }

  /**
   * Fonction pour construire notre formulaire
   * @returns {FormGroup}
   *
   * @private
   */
  private static buildForm(): FormGroup {
    return new FormGroup({
      _id: new FormControl(''),
      description: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      types: new FormControl(''),
    });
  }



}
