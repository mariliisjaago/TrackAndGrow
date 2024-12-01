import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { GoalsComponent } from "./goals/goals/goals.component";
import { GoalComponent } from './goals/goal/goal.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, GoalsComponent, GoalComponent, MatButtonModule]
})
export class AppComponent {
  title = 'TrackAndGrow';

  /**
   *
   */
  constructor(private router: Router) {
  }

  navigateToGoalsView() {
    this.router.navigate(['/goals']);
  }

  navigateToV2View() {
    this.router.navigate(['/goals-v2']);
  }
}
