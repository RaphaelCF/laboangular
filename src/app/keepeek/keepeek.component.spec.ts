import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeepeekComponent } from './keepeek.component';

describe('KeepeekComponent', () => {
  let component: KeepeekComponent;
  let fixture: ComponentFixture<KeepeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeepeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeepeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
