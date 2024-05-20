import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyQuizComponent } from './formly-quiz.component';

describe('FormlyQuizComponent', () => {
  let component: FormlyQuizComponent;
  let fixture: ComponentFixture<FormlyQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormlyQuizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormlyQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
