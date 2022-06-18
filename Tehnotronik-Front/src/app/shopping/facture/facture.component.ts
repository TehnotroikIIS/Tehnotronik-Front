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
  
  printFacture(){
    /*html2canvas(document.body).then(function(canvas) {
      document.body.appendChild(canvas);
    });*/
    const pdfTable = this.pdfTable.nativeElement;
    const doc: jsPDF = new jsPDF("p", "mm", "a4");
    doc.html(pdfTable, {
       callback: (doc) => {
         doc.output("dataurlnewwindow");
       }
    });
  }

}
