import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DahboardComponent } from './dahboard.component';

describe('DahboardComponent', () => {
  let component: DahboardComponent;
  let fixture: ComponentFixture<DahboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DahboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DahboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
