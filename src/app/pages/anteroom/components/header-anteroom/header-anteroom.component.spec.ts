import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAnteroomComponent } from './header-anteroom.component';

describe('HeaderAnteroomComponent', () => {
  let component: HeaderAnteroomComponent;
  let fixture: ComponentFixture<HeaderAnteroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderAnteroomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderAnteroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
