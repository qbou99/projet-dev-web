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
      titres: []
    };
  }

  ngOnInit() {
    debugger;
    this.form.patchValue({
      id: this.articleModel.id,
      nom: this.articleModel.nom,
      prenom: this.articleModel.prenom,
      email: this.articleModel.email,
      titres: this.articleModel.titres || [],
      sexe: this.articleModel.sexe,
      photo: this.articleModel.photo,
      telephone: this.articleModel.telephone
    });
  }

  cancel() {
    this.cancelEvent$.emit();
  }

  submit(article: Article) { //Formulaire
    article.photo = this.articleModel.photo;
    this.submitEvent$.emit(article);
  }


  addChipset(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.articleModel.titres!.push(value);
    }
    event.chipInput!.clear();
  }

  removeChipset(titre: any): void {
    const index = this.articleModel.titres!.indexOf(titre);
    this.articleModel.titres!.splice(index, 1);
  }

  onFileSelected(event:Event | null) {
    const files = (<HTMLInputElement>event?.currentTarget).files;
    const file:File | null = files!.item(0);

    if (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
          this.articleModel.photo = reader.result;
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
      id: new FormControl(''),
      prenom: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      nom: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      email: new FormControl('', Validators.required),
      titres: new FormControl(''),
      sexe: new FormControl(''),
      telephone: new FormControl('', Validators.compose([Validators.required, Validators.pattern('\\d{10}')])),
    });
  }



}
