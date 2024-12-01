import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalV2Component } from './goal-v2.component';

describe('GoalV2Component', () => {
  let component: GoalV2Component;
  let fixture: ComponentFixture<GoalV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalV2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoalV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
