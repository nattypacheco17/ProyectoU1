import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerNameNumberComponent } from './player-name-number.component';

describe('PlayerNameNumberComponent', () => {
  let component: PlayerNameNumberComponent;
  let fixture: ComponentFixture<PlayerNameNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerNameNumberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerNameNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
