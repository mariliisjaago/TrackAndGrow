export class GoalRender {
    id: number;
    parentGoalId: number;
    firstChildId: number;
    nextSiblingId: number;
    title: string;
    text: string;
    isCompleted: boolean;
    completedDate: Date | undefined;
    isFirstChild: boolean;
    isRoot: boolean;
    children: GoalRender[];

    constructor(
        id: number,
        parentGoalId: number,
        firstChildId: number,
        nextSiblingId: number,
        title: string,
        text: string,
        isCompleted: boolean,
        completedDate: Date | undefined,
        isFirstChild: boolean,
        isRoot: boolean,
        children: GoalRender[]
    ) {
        this.id = id;
        this.parentGoalId = parentGoalId;
        this.firstChildId = firstChildId;
        this.nextSiblingId = nextSiblingId;
        this.title = title;
        this.text = text;
        this.isCompleted = isCompleted;
        this.completedDate = completedDate;
        this.isFirstChild = isFirstChild;
        this.isRoot = isRoot;
        this.children = children;
    }
}