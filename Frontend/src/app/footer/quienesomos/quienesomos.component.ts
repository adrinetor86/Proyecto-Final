import {Component, Inject, Renderer2,OnInit, OnDestroy} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-quienesomos',
  templateUrl: './quienesomos.component.html',
  styleUrl: './quienesomos.component.css'
})
export class QuienesomosComponent implements OnInit,OnDestroy{

  constructor(private renderer: Renderer2,
              @Inject(DOCUMENT) private document: Document) { }
  ngOnInit(): void {

    this.renderer.setStyle(this.document.body, 'background', '#161a3a');
  }


  ngOnDestroy() {
    this.renderer.setStyle(this.document.body, 'background', 'var(--background-image)');
  }
}
