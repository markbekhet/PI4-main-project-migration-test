import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NurseInterface } from 'src/app/models/Nurse';
import { APIService } from 'src/app/services/api-service/api.service';
import { Exception } from 'src/app/utils/Exception';
import { ErrorMessageDialogComponent } from '../../error-message-dialog/error-message-dialog.component';

@Component({
  selector: 'app-nurse-creation-dialog',
  templateUrl: './nurse-creation-dialog.component.html',
  styleUrls: ['./nurse-creation-dialog.component.css']
})
export class NurseCreationDialogComponent  implements OnInit{
  @Output() errorState: EventEmitter<boolean>;
  nurseErrorState: boolean;
  initNurseUsername: string;
  possibleContracts!: string[];
  

  constructor(public dialogRef: MatDialogRef<NurseCreationDialogComponent >,
    @Inject(MAT_DIALOG_DATA) public data:  {nurse: NurseInterface, nurses: string[]},
    private api: APIService,
    private dialog: MatDialog,  
) {
  this.errorState = new EventEmitter();
  this.nurseErrorState = true;
  this.initNurseUsername = data.nurse.username;
      
}
  ngOnInit(): void {
    this.possibleContracts = [];
    try{
      this.api.getContractNames().subscribe({
        next: (contracts: string[])=>{
          contracts.forEach((contract: string)=>{
            this.possibleContracts.push(contract);
          })
        },
        error: (error: HttpErrorResponse)=>{
          this.openErrorDialog(error.error);
        }
      })
    }catch(err){
      //Do nothing
    }

  }

  add() {
    try
    { 
      console.log(this.data.nurse);
      if(this.initNurseUsername == ""){
      this.api.addNurse(this.data.nurse).subscribe({
        error: (err: HttpErrorResponse)=> {
          if(err.status === HttpStatusCode.Ok) {
            this.close();
          }
          else{
            this.openErrorDialog(err.error)
          }
        } 
      })
    }
    else {
      this.api.updateNurse(this.data.nurse).subscribe({
        error: (err: HttpErrorResponse)=> {
          if(err.status === HttpStatusCode.Ok) {
            this.close();
          }          
          else{
            this.openErrorDialog(err.error)
          }
        }
      })
    } 
  }
  catch(e){
    this.openErrorDialog((e as Exception).getMessage())
  }
  }


openErrorDialog(message: string) {
  this.dialog.open(ErrorMessageDialogComponent, {
    data: {message: message},
  })
}

close(){
  this.dialogRef.close();

}

updateNurseErrorState(e: boolean) {
  console.log("update")
  this.nurseErrorState = e;
}

}
