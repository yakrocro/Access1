import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeInComponent } from './code-in.component';

describe('CodeInComponent', () => {
  let component: CodeInComponent;
  let fixture: ComponentFixture<CodeInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
