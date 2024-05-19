import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeOldPasswordComponent } from './change-old-password.component';

describe('ChangeOldPasswordComponent', () => {
  let component: ChangeOldPasswordComponent;
  let fixture: ComponentFixture<ChangeOldPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeOldPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeOldPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
