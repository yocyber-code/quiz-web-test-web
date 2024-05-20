import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyFieldInputRowComponent } from './formly-field-input-row.component';

describe('FormlyFieldInputComponent', () => {
  let component: FormlyFieldInputRowComponent;
  let fixture: ComponentFixture<FormlyFieldInputRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlyFieldInputRowComponent]
    });
    fixture = TestBed.createComponent(FormlyFieldInputRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
