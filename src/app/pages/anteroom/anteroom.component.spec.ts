import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnteroomComponent } from './anteroom.component';

describe('AnteroomComponent', () => {
  let component: AnteroomComponent;
  let fixture: ComponentFixture<AnteroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnteroomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnteroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
