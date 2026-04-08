import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reciepes } from './reciepes';

describe('Reciepes', () => {
  let component: Reciepes;
  let fixture: ComponentFixture<Reciepes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reciepes],
    }).compileComponents();

    fixture = TestBed.createComponent(Reciepes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
