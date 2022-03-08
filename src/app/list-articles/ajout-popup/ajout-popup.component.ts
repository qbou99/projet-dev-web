import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Article} from "../../model/Article";

export type PopupAction = Article & {mode: string};

@Component({
  selector: 'app-ajout-popup',
  templateUrl: './ajout-popup.component.html',
  styleUrls: ['./ajout-popup.component.scss']
})
export class AjoutPopupComponent {

  constructor(public dialogRef: MatDialogRef<AjoutPopupComponent>) {}

  closeDialog(result: Article & {mode?: string} | null = null) {
    this.dialogRef.close(result);
  }

  onCancel() {
    this.closeDialog();
  }

  onCreate(article: Article) {
    this.closeDialog({...article, mode: 'create'});
  }

  onUpdate(article: Article) {
    this.closeDialog({...article, mode: 'update'});
  }

}
