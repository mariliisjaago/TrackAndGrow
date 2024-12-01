import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { GoalViewModel } from "../models/goal-view";
import { GoalRender } from "../models/goal-render";
import { NewGoal } from "../models/new-goal";
import { UpdateGoal } from "../models/update-goal";
import { environment } from "../../environments/environment";

@Injectable({
        providedIn: 'root'
    })
export class GoalsService {
    private baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = `${environment.backendBaseUrl}/goals`;
    }

    getGoals(): Observable<GoalRender[]> {
        const goals$ = this.http.get<GoalViewModel[]>(`${this.baseUrl}`);
        const renderableGoals$ = this.prepareForRender(goals$);
        return renderableGoals$;
    }

    addGoal(goal: NewGoal) {
      return this.http.post(`${this.baseUrl}`, goal).subscribe();
    }

    deleteGoal(id: number|undefined) {
      return this.http.delete(`${this.baseUrl}?id=${id}`).subscribe(data => console.log("deleted"));
    }

    updateGoal(goal: UpdateGoal) {
      return this.http.put(`${this.baseUrl}?id=${goal.id}`, goal).subscribe(data => console.log("updated"));
    }
    
    private prepareForRender(goals$: Observable<GoalViewModel[]>): Observable<GoalRender[]> {
      var roots$ = goals$.pipe(map(goals => goals.filter(g => g.isRoot)));
      var renderedRoots$ = roots$.pipe(
        map(roots => this.prepareRootsForRender(roots))
      );
      return renderedRoots$;
    }

    private prepareRootsForRender(roots: GoalViewModel[]): GoalRender[] {
      let rendered: GoalRender[] = [];
      roots.forEach(r => {
        const children = this.getChildren(r);
        const renderObject = new GoalRender(r.id, r.parentGoalId, r.firstChildId, r.nextSiblingId, r.title, r.text, r.isCompleted, r.completedDate, r.isFirstChild, r.isRoot, children);
        rendered.push(renderObject);
      });
      return rendered;
    }

    private getChildren(node: GoalViewModel): GoalRender[] {
      let children: GoalRender[] = [];
      if (node.firstChildId != 0 && node.firstChild != null) { 
        const newChildren = this.getChildren(node.firstChild);
        const child = new GoalRender(node.firstChild.id, node.id, node.firstChild.firstChildId, node.firstChild.nextSiblingId, node.firstChild.title, node.firstChild.text, node.firstChild.isCompleted, node.firstChild.completedDate, node.firstChild.isFirstChild, node.firstChild.isRoot, newChildren);
        children.push(child);
        if (node.firstChild.nextSiblingId != 0 && node.firstChild.nextSibling != null) {
          const siblings = this.getAllRemainingSiblings(node.firstChild);
          siblings.forEach(s => children.push(s));
        }
      }

      return children;
    }

    private getAllRemainingSiblings(node: GoalViewModel): GoalRender[] {
      let siblings: GoalRender[] = [];
      let idx = 0;
      while(node.nextSiblingId != 0 && node.nextSibling != null && idx < 100) {
        const children = this.getChildren(node.nextSibling);
        const renderObject = new GoalRender(node.nextSibling.id, node.nextSibling.parentGoalId, node.nextSibling.firstChildId, node.nextSibling.nextSiblingId, node.nextSibling.title, node.nextSibling.text, node.nextSibling.isCompleted, node.nextSibling.completedDate, node.nextSibling.isFirstChild, node.nextSibling.isRoot, children);
        siblings.push(renderObject);
        node = node.nextSibling;
        idx++;
      }
      
      return siblings;
    }
}