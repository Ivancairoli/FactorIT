import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-buy-modal',
  templateUrl: './buy-modal.component.html',
  styleUrls: ['./buy-modal.component.scss']
})
export class BuyModalComponent {

  constructor(public dialogRef: MatDialogRef<BuyModalComponent>) {}

}
