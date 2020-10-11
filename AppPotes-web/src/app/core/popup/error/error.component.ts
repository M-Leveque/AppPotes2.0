import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Error } from '../../../models/Error.model';

export interface ErrorData {
  error: any;
  callback: Function;
  context: any;
}

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.sass']
})
export class ErrorComponent implements OnInit {

  error: Error;
  title: string;

  ngOnInit(): void {
  }

  constructor(
    public dialogRef: MatDialogRef<ErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ErrorData) 
  {
    this.title = "Une erreur est survenue";
    this.error = new Error(this.data.error.code);
  }

    validate(): void {
      if(this.data.callback != null ) this.data.callback(this.data.context);
      this.dialogRef.close();
    }
}
