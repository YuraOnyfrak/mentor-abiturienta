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
  public value = 'https://www.techiediaries.com/';

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
    return `.btn {
      background-color:#FF9000;
      border-radius: 2em;
      color: #ffffff;
      display: block; 
      margin: 0 auto;
      margin-bottom: 1.5em;
      padding: 1.125em 0;
      position: relative;      
      width: 200px;
      -webkit-print-color-adjust: exact; 
    }
    item {
      font-size: 1.1em;
      padding: 1em;
      border: 2px dashed black;
      margin-right: 50px;
  }  
  .item>h2{
      text-align: center;
      color: #000;
  } 
  
  .advertisment-container{
      /* height: 60vh; */
      text-align: center;	    
  }  
  .advertisment-container>.logo{
      max-width: 320px;
      margin: 20px 0;
  }  
  .advertisment-container .info_text {     
    margin: 0 auto;
    font-weight: 400;
    max-width: 400px;   
    text-align: center;
    margin: 0 auto;
  }  
  .advertisment-container .qr-section{
      width:100px; 
      height: 100px;
      margin: 0 auto;
  }  
  .print-btn{
      margin-top: 10px;
  }`;
  }

}
