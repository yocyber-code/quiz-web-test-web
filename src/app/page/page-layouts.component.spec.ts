import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLayoutsComponent } from './page-layouts.component';

describe('PageLayoutsComponent', () => {
  let component: PageLayoutsComponent;
  let fixture: ComponentFixture<PageLayoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageLayoutsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
