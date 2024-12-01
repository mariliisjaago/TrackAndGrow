import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GoalV2 } from "../models-2/goal-v2";
import { Observable } from "rxjs";
import { UpdateGoalV2 } from "../models-2/update-goal-v2";
import { NewGoalV2 } from "../models-2/new-goal-v2";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
  })
export class GoalsV2Service {
    private baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = `${environment.backendBaseUrl}/goalsAutomagic`;
    }

    getGoal(id: number): Observable<GoalV2> {
        const goal$ = this.http.get<GoalV2>(`${this.baseUrl}/id?id=${id}`);
        return goal$;
    }

    updateGoal(goal: UpdateGoalV2) {
        return this.http.put(`${this.baseUrl}?id=${goal.id}`, goal).subscribe(data => console.log("updated"));
    }

    deleteGoal(id: number|undefined) {
        return this.http.delete(`${this.baseUrl}?id=${id}`).subscribe(data => console.log("deleted"));
    }

    addGoal(goal: NewGoalV2) {
        return this.http.post(`${this.baseUrl}`, goal).subscribe();
      }

}