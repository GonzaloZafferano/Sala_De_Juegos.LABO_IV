import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatallaDragonBallComponent } from './batalla-dragon-ball.component';

describe('BatallaDragonBallComponent', () => {
  let component: BatallaDragonBallComponent;
  let fixture: ComponentFixture<BatallaDragonBallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatallaDragonBallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatallaDragonBallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
