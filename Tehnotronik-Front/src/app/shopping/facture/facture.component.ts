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
  //@ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }
  public printFacture(){
    const doc = new jsPDF();

    const specialElementHandlers = {
      //'#editor': function (element, renderer) {
        //return true;
      //}
    };

    //const pdfTable = this.pdfTable.nativeElement;

    /*doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      width: 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('tableToPdf.pdf');*/
  }

}
