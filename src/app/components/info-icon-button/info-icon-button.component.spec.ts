import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoIconButtonComponent } from './info-icon-button.component';

describe('InfoIconButtonComponent', () => {
  let component: InfoIconButtonComponent;
  let fixture: ComponentFixture<InfoIconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoIconButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
