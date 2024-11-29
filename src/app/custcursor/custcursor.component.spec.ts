import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustcursorComponent } from './custcursor.component';

describe('CustcursorComponent', () => {
  let component: CustcursorComponent;
  let fixture: ComponentFixture<CustcursorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustcursorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustcursorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
