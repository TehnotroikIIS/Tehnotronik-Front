import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  products=[];
  names:any[]=[];
  locations=[];
  quantities=[];
  element: any;
  renderer: any;
  @ViewChild('pdfTable', {static: true}) pdfTable!: ElementRef;
  constructor() { }

  ngOnInit(): void {
    this.names = JSON.parse(localStorage.getItem('names') || '');
    this.locations = JSON.parse(localStorage.getItem('locations') || '');
    console.log(this.locations)
    this.quantities = JSON.parse(localStorage.getItem('quantities') || '');
    
   
    
   

  }
  printFacture(){
    /*html2canvas(document.body).then(function(canvas) {
      document.body.appendChild(canvas);
    });*/
    html2canvas(this.pdfTable.nativeElement, { scale: 3 }).then((canvas) => {
      const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
      const fileWidth = 200;
      const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
      let PDF = new jsPDF('p', 'mm', 'a4',);
      PDF.addImage(imageGeneratedFromTemplate, 'PNG', 0, 5, fileWidth, generatedImageHeight,);
      PDF.html(this.pdfTable.nativeElement.innerHTML)
      PDF.save('angular-invoice-pdf-demo.pdf');
    });
  }

}
