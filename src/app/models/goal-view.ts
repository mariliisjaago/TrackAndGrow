export class GoalViewModel {
    id: number;
    parentGoalId: number;
    firstChildId: number;
    nextSiblingId: number;
    firstChild: GoalViewModel | null;
    nextSibling: GoalViewModel | null;
    title: string;
    text: string;
    isCompleted: boolean;
    completedDate: Date | undefined;
    isFirstChild: boolean;
    isRoot: boolean;

    constructor(
        id: number,
        parentGoalId: number,
        firstChildId: number,
        nextSiblingId: number,
        firstChild: GoalViewModel | null,
        nextSibling: GoalViewModel | null,
        title: string,
        text: string,
        isCompleted: boolean,
        completedDate: Date | undefined,
        isFirstChild: boolean,
        isRoot: boolean
    ) {
        this.id = id;
        this.parentGoalId = parentGoalId;
        this.firstChildId = firstChildId;
        this.nextSiblingId = nextSiblingId;
        this.firstChild = firstChild;
        this.nextSibling = nextSibling;
        this.title = title;
        this.text = text;
        this.isCompleted = isCompleted;
        this.completedDate = completedDate;
        this.isFirstChild = isFirstChild;
        this.isRoot = isRoot;
    }
}