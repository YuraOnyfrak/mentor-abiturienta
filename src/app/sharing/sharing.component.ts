import { Component, OnInit } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-sharing',
  templateUrl: './sharing.component.html',
  styleUrls: ['./sharing.component.css']
})
export class SharingComponent implements OnInit {

  public elementType = NgxQrcodeElementTypes.URL;
  public correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  public schoolUrlForPrint = 'https://mentor-abiturienta.imfast.io/#/student';
  public universityUrlForPrint = 'https://mentor-abiturienta.imfast.io/#/';

  constructor() { }

  ngOnInit() {
  }

  public onPrintAdvertismentForSchool(): void {
    this.createPrintPage("school");
  }
  

  public onPrintAdvertismentForUniversity(): void {
    this.createPrintPage("university");
  }

  private createPrintPage(sectionId: string){
    let printContents, popupWin;
    printContents = document.getElementById(sectionId).innerHTML;
    popupWin = window.open(null, "PRINT", "top=0,left=0,height=100%,width=auto");
    popupWin.document.open();
    popupWin.document.write(`
			<html>
				<head>
				<style>
					${this.getStyles()}
				</style>
				</head>
        <body onload=\"window.print();window.close();\">
            <div class="container">${printContents}
            </div>
        </body>
			</html>`
    );
    popupWin.document.close();
  }

  private getStyles() : string{
    return `@page{
      margin: 0mm;
    }
    .advertisment-container {
      font-size: 1.1em;
      padding: 0 3em;
      display: flex;
      justify-content: center;
      flex-direction: column;
      text-align: center;	 
      margin: 0 40px;
  }   
  .title{
      text-align: center;
      color: #000;
      font-size: large;
      font-weight: bold;
      margin: 15px 0;
  }  
  .advertisment-container>.logo{
      max-width: 320px;
      margin: 0 auto;
      padding: 45px; 
  }  
  .advertisment-container .info_text {     
    font-weight: 400;
    max-width: 400px;   
    text-align: center;
    margin: 0 auto;
  }  
  
  .bshadow {
    display: flex;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(5px 5px 5px #222222);
    margin: 20px 0; 
  }

  .print-btn{
     display: none;
  }
  
  .title-text{
    display: none;
  } 
  `;
  }

}
