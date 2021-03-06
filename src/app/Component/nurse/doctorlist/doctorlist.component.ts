import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EditDailogeComponent } from '../dailoge/edit-dailoge/edit-dailoge.component';
import { DailogeService } from 'src/app/Services/dailoge.service';

import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctordata';
import { Attendance } from 'src/app/models/Attendance';

@Component({
  selector: 'app-doctorlist',
  templateUrl: './doctorlist.component.html',
  styleUrls: ['./doctorlist.component.css']
})

export class DoctorlistComponent implements OnInit {
doctorlist!:Attendance[];
  displayedColumns = ['id', 'physicianId', 'timeSlot' , 'dateTime' , 'isAbsent' ];
  dataSource1 !: MatTableDataSource<Attendance>;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort, {}) sort !: MatSort;

  pastVisit:string="PastVisit";
  constructor(public dialogService: MatDialog, public appoiService: DailogeService, private router:Router) { }

  ngOnInit() {
    this.getdata();
   this.getdoctordata();
  }
  getdata() {
    this.appoiService.getDoctorListData().subscribe(data => {
      this.dataSource1 = new MatTableDataSource(data)    
      this.dataSource1.paginator = this.paginator;
      console.log(this.dataSource1)
    });
  }
  
  applyFilter(filterValue: any) {
    let itemvalue = filterValue.target.value;   
    this.dataSource1.filter = itemvalue.trim().toLowerCase();
    this.dataSource1.paginator = this.paginator;

  }
  OnVisit(){
    console.log("vamsiclicked")
    this.router.navigateByUrl('/PatientDetails');
  }
 
  getdoctordata() {
    this.appoiService.getDoctorListData().subscribe(data => {
      this.doctorlist=data;     
      
    });
  }
  onSelect(id: any) {
    let itemvalue = id.target.value;   
    console.log(id.target.value);
    if (itemvalue!=0){
      this.dataSource1.filter = itemvalue.trim().toLowerCase();
    }
    else{
      this.getdata();

    }
   
    
  }
}
