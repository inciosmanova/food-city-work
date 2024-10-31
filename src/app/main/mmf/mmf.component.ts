import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmtextComponent } from './confirmtext/confirmtext.component';

@Component({
  selector: 'app-mmf',
  templateUrl: './mmf.component.html',
  styleUrls: ['./mmf.component.scss']
})
export class MmfComponent {
  readonly dialog = inject(MatDialog);

  openDialog(){
    const dialogRef = this.dialog.open(ConfirmtextComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  
  }
}
