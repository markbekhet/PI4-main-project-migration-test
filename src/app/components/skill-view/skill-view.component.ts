import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SkillInterface } from 'src/app/models/skill';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { SkillService } from 'src/app/services/shift/skill.service';
import { CacheUtils } from 'src/app/utils/CacheUtils';
import { Exception } from 'src/app/utils/Exception';
import { ErrorMessageDialogComponent } from '../error-message-dialog/error-message-dialog.component';
import { SkillCreationDialogComponent } from '../skill-creation-dialog/skill-creation-dialog.component';

@Component({
  selector: 'app-skill-view',
  templateUrl: './skill-view.component.html',
  styleUrls: ['./skill-view.component.css']
})
export class SkillViewComponent implements OnInit, AfterViewInit{
  skills: string[];
  connectedUser!:boolean;
  displayedColumns: string[]; 
  dataSource: MatTableDataSource<string>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private skillService: SkillService, private profileService: ProfileService) {
  this.skills = [];
      this.displayedColumns =  ['name','actions'];
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
       try{
      this.getSkills();
      this.connectedUser = true;
    }catch(err){
      this.connectedUser = false;
    }
  }

  ngAfterViewInit(): void {
    this.profileService.profileChanged.subscribe(()=>{
      this.getSkills()
    })
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getSkills(){
  this.skillService.getAllSkills().subscribe({
    next: (skill: string[])=> {
      this.skills = skill;
      this.dataSource.data = skill;
    },
    error: (error: HttpErrorResponse)=> {
      this.openErrorDialog(error.error);
    }
  })
  }

  openSkillCreationDialog(skill: SkillInterface) {
    const dialog = this.dialog.open(SkillCreationDialogComponent,  
      { disableClose: true,  
        height: '40%',
        width: '55%', 
        position: {top:'5vh',left: '25%', right: '25%'},
        data: {skill:skill,skills:this.skills},
      });
    
      dialog.afterClosed().subscribe(()=>{
        this.getSkills();
      })
  }

  addNewSkill(){
    const newSkill = {name: '', profile: CacheUtils.getProfile()};
    this.openSkillCreationDialog(newSkill); 
  }

  openErrorDialog(message: string) {
  this.dialog.open(ErrorMessageDialogComponent, {
      data: {message: message},
    })
  }

  deleteSkill(skillName: string){
  try
  { 
    //call api service to push the contract
    this.skillService.deleteSkill(skillName).subscribe({
      error: (err: HttpErrorResponse)=> {
        if(err.status === HttpStatusCode.Ok) {
          const index = this.skills.indexOf(skillName);
          if (index > -1) {
            this.skills.splice(index, 1);
          }
        }
        else{
          this.openErrorDialog(err.error)
        }
      } 
    })
  }
  catch(e){
    console.log("error")
    this.openErrorDialog((e as Exception).getMessage())
  }
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}
