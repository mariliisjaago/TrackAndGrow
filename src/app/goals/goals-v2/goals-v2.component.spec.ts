import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsV2Component } from './goals-v2.component';

describe('GoalsV2Component', () => {
  let component: GoalsV2Component;
  let fixture: ComponentFixture<GoalsV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalsV2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoalsV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
