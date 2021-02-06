import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-windows',
  templateUrl: './dialog-windows.component.html',
  styleUrls: ['./dialog-windows.component.css']
})
export class DialogWindowsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogWindowsComponent>
    ) {}

  ngOnInit(): void {
  }
 
}