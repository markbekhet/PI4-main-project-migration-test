import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NurseInterface } from 'src/app/models/Nurse';

@Component({
  selector: 'app-nurse-creation',
  templateUrl: './nurse-creation.component.html',
  styleUrls: ['./nurse-creation.component.css']
})
export class NurseCreationComponent implements OnInit {
  @Input() nurse!: NurseInterface;
  @Output() nurseChange: EventEmitter<NurseInterface>;
  @Output() errorState: EventEmitter<boolean>;
  @Input() possibleContracts!: string[];
  @Input() selectedContract!: string;
  @Input() nurses!: string[]

  usernameNurseFormCtrl: FormControl;
  nameNurseFormCtrl: FormControl;
  contractSelectorError: boolean;
  inputDisabled: boolean;
  contractsError: boolean;
  nurseStartUsername!: string;



  constructor(){
    this.nurseChange = new EventEmitter();
    this.errorState = new EventEmitter();
 
    this.usernameNurseFormCtrl = new FormControl(null, Validators.required);
    this.nameNurseFormCtrl = new FormControl(null, Validators.required);
    this.contractSelectorError = true;
    this.inputDisabled = false;
    this.contractsError = true;
  }

  ngOnInit(): void {
    this.inputDisabled = this.nurse.name === ""? false: true;
    this.inputDisabled = this.nurse.username === ""? false: true;
    this.usernameNurseFormCtrl = new FormControl({value: this.nurse.username, disabled: this.inputDisabled},
      Validators.required);
    this.nameNurseFormCtrl = new FormControl({value: this.nurse.name, disabled: this.inputDisabled},
        Validators.required);
    this.nurseStartUsername = this.nurse.username;
   
  }

  addContract() {
    const index = this.possibleContracts.indexOf(this.selectedContract);
    if (index > -1) {
      this.possibleContracts.splice(index, 1);
    }
    this.nurse.contracts.push(this.selectedContract);
    if (this.possibleContracts.length > 0) {
        this.selectedContract= this.possibleContracts[0];
    }
    this.contractSelectorError = false;
    this.emitNurse();
  }
  
  removeContract(contract: string) {
    const index = this.nurse.contracts.indexOf(contract);
    if (index > -1) {
      this.nurse.contracts.splice(index, 1);
    }
    if (contract !== undefined && contract !== null) {
      this.possibleContracts.push(contract);
    }
    if(this.nurse.contracts.length === 0){
      this.contractSelectorError = true;
    } 
    this.emitNurse()
  }


  emitNurse(){
    this.nurseChange.emit(this.nurse);
    this.emitErrorState();
  }

  emitErrorState() {
    this.errorState.emit(this.nameNurseFormCtrl.hasError('required') || this.usernameNurseFormCtrl.hasError('required') || (this.usernameExist() && this.nurseStartUsername === '') ||this.contractSelectorError );
    console.log("error");
  }

  usernameExist(): boolean {
    return this.nurses.includes(this.nurse.username);
  }

}

