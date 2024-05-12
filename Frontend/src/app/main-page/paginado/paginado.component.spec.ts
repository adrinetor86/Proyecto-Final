import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadoComponent } from './paginado.component';

describe('PaginadoComponent', () => {
  let component: PaginadoComponent;
  let fixture: ComponentFixture<PaginadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
