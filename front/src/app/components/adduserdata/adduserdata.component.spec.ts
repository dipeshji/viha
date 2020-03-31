import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdduserdataComponent } from './adduserdata.component';

describe('AdduserdataComponent', () => {
  let component: AdduserdataComponent;
  let fixture: ComponentFixture<AdduserdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdduserdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdduserdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
