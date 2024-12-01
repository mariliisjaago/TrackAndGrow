import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GoalsV2Component } from './goals/goals-v2/goals-v2.component';
import { GoalsComponent } from './goals/goals/goals.component';

export const routes: Routes = [
    { path: 'goals', component: GoalsComponent },
    { path: 'goals-v2', component: GoalsV2Component },
];
