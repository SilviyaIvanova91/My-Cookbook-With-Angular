import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciepesComponent } from './reciepes';

describe('ReciepesComponent', () => {
  let component: ReciepesComponent;
  let fixture: ComponentFixture<ReciepesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReciepesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReciepesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
