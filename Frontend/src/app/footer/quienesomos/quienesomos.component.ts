import {Component, Inject, Renderer2,OnInit, OnDestroy} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-quienesomos',
  templateUrl: './quienesomos.component.html',
  styleUrl: './quienesomos.component.css'
})
export class QuienesomosComponent implements OnInit,OnDestroy{

  constructor(private renderer: Renderer2,
              @Inject(DOCUMENT) private document: Document,private tituloPagina:Title) { }
  ngOnInit(): void {
  scrollTo(0,0);
      this.tituloPagina.setTitle("Quienes Somos")
    this.renderer.setStyle(this.document.body, 'background', '#161a3a');
  }


  ngOnDestroy() {
    this.renderer.setStyle(this.document.body, 'background', 'var(--background-image)');
  }
}
