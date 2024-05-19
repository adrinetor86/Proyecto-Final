import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchCodeVerificationComponent } from './catch-code-verification.component';

describe('CatchCodeVerificationComponent', () => {
  let component: CatchCodeVerificationComponent;
  let fixture: ComponentFixture<CatchCodeVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatchCodeVerificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatchCodeVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
