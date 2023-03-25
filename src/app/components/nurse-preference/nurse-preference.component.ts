
import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { FormControl } from "@angular/forms";
import { WEIGHT_ALLOWED_INTEGERS } from "src/app/constants/regex";
import { NurseInterface } from "src/app/models/Nurse";


interface  SchedulePref
  {
      preference_date: string,
      preference_username: string,
      preference_pref: string,
      preference_shift: string,
      preference_weight: string,
  }


@Component({
    selector: 'app-nurse-preference',
    templateUrl: './nurse-preference.component.html',
    styleUrls: ['./nurse-preference.component.css']
  })
  export class NursePreferenceComponent implements OnInit, OnChanges{
  regex = WEIGHT_ALLOWED_INTEGERS

  weight: string;
  @Input() shifts!: string[];
  @Input() nurses!: NurseInterface[]; 
  @Input() startDate!: Date;
  @Input() endDate!: Date;

  timetable: string[];
  selectedShifts: { nurse: string, shift: string, weight: string }[] = [];
  preferences: Map<string, Map<string,Map<string, {pref: string, weight: string}>>>;
  nurseSelectorFormControl = new FormControl();
  scedulePref: SchedulePref[];

  constructor() {
    this.scedulePref = [];
    this.weight = '';
    this.preferences = new Map();
    this.timetable = ["Monday, April 3, 2023", "Tuesday, April 4, 2023", "Wednesday, April 5, 2023", "Thursday, April 6, 2023", "Friday, April 7, 2023", "Saturday, April 8, 2023", "Sunday, April 9, 2023"];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["nurses"] && changes["nurses"].currentValue) {
      this.nurses = changes["nurses"].currentValue;
    }
    if (changes["shifts"] && changes["shifts"].currentValue) {
      this.shifts = changes["shifts"].currentValue;
    }
    this.ngOnInit()
    this.getButtonState();
  }


  ngOnInit(): void {
    //initiate preferences
    this.preferences = new Map()
    for(const date of this.timetable){
      this.preferences.set(date, new Map());
      for (const nurse of this.nurses) {
        this.preferences.get(date)?.set(nurse.username, new Map())
        for (const shift of this.shifts) {
          this.preferences.get(date)?.get(nurse.username)?.set(shift, { pref: '', weight: '' })
        }
      }
    }
  }

  updatePreferences(date: string, nurse: string, shift: string) {
    if (!this.preferences.get(date)?.get(nurse)) {
      this.preferences.get(date)?.set(nurse, new Map());
    }
    if (!this.preferences.get(date)?.get(nurse)?.get(shift)) {
      this.preferences.get(date)?.get(nurse)?.set(shift,{ pref: '', weight: '' });
    }
    let pref = this.preferences.get(date)?.get(nurse)?.get(shift)?.pref;
    let weight =  this.weight;
    if(this.weight ===  this.preferences.get(date)?.get(nurse)?.get(shift)?.weight){
      if(this.preferences.get(date)?.get(nurse)?.get(shift)?.pref === 'ON') {
        pref = 'OFF';
      } else {
        pref = '';
        weight = "";
      }
      
      
    } else {
      pref = 'ON';
    }
    this.preferences.get(date)?.get(nurse)?.set(shift, { pref, weight });
    console.log(this.preferences);
    this.emitSchedulePref();
  }

  showToolTip(date: string,nurse: string, shift: string):string {
    const preferenceObj = this.preferences.get(date)?.get(nurse)?.get(shift)
    if(preferenceObj === undefined){
      return "";
    }
    return "The weight is "+ preferenceObj.weight
  }

  getButtonState(date?: string, nurse?: string, shift?: string): string {
    if(date !== undefined && nurse !==  undefined && shift !==  undefined) {
    if(this.preferences.get(date)?.get(nurse)?.get(shift)?.pref === 'ON') {
      return "check"
    } 
    if (this.preferences.get(date)?.get(nurse)?.get(shift)?.pref === 'OFF') {
      return "close"
    }
    return "check_box_outline_blank";
  }
  return "check_box_outline_blank";
  }

  getButtonStyle(date: string, nurse: string, shift: string) {
    const pref = this.preferences.get(date)?.get(nurse)?.get(shift)?.pref;
    if (pref === 'ON') {
      return {'background-color': 'rgb(228, 241, 226)' };
    } else if (pref === 'OFF') {
      return {'background-color': 'rgb(246, 233, 232)' };
    }
    return { 'background-color': 'rgb(235, 234, 234)' };
  }

  emitSchedulePref(){
    this.scedulePref = [];
    for(const date of this.timetable){
      for (const nurse of this.nurses) {
        for (const shift of this.shifts) {
          const preferenceObj = this.preferences.get(date)?.get(nurse.username)?.get(shift)
          if( preferenceObj && (preferenceObj.pref === 'OFF' ||
              preferenceObj.pref === 'ON')){
            const schedule = {
              preference_date: date, 
              preference_username: nurse.username, 
              preference_pref: preferenceObj.pref,
              preference_shift: shift,
              preference_weight: preferenceObj.weight
            }
            this.scedulePref.push(schedule);
          }
        }
      }
    }
    console.log("emit schedule", this.scedulePref)
  }
}