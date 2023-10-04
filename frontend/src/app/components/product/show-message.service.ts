import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

type TypeMessage = 'message-success' | 'message-failed'

@Injectable({
  providedIn: 'root'
})
export class ShowMessageService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  public showMessage(message: string, typeMessage: TypeMessage) {
    this.snackBar.open(message, 'x', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [typeMessage],
    })
  }
}
