import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarWithFrameComponent } from './avatar-with-frame.component';

describe('AvatarWithFrameComponent', () => {
  let component: AvatarWithFrameComponent;
  let fixture: ComponentFixture<AvatarWithFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarWithFrameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvatarWithFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
