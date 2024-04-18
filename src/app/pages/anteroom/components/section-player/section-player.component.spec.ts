import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionPlayerComponent } from './section-player.component';

describe('SectionPlayerComponent', () => {
  let component: SectionPlayerComponent;
  let fixture: ComponentFixture<SectionPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionPlayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
