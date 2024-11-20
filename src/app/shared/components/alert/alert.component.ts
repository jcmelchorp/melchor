import { MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  faTimes = faTimes;
  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data
  ) { }

  ngOnInit(): void {
  }
  onClose() {
    this.dialogRef.close();
  }
}
