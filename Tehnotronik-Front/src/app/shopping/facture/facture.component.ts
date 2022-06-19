import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit {
  element: any;
  renderer: any;
  @ViewChild('pdfTable', {static: true}) pdfTable!: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }
  
  async printFacture(){
    /*html2canvas(document.body).then(function(canvas) {
      document.body.appendChild(canvas);
    });*/
    //this.report=true;
   
    html2canvas(this.pdfTable.nativeElement, { scale: 3 }).then((canvas) => {
      const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
      const fileWidth = 200;
      const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
      let PDF = new jsPDF('p', 'mm', 'a4',);
      PDF.addImage(imageGeneratedFromTemplate, 'PNG', 0, 5, fileWidth, generatedImageHeight,);
      PDF.html(this.pdfTable.nativeElement.innerHTML)
      PDF.save('angular-invoice-pdf-demo.pdf');
      window.location.reload();
    });
    
  }
}
