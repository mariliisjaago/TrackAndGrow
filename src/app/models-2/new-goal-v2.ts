export class NewGoalV2 {
    title: string | null;
    text: string | null;
    parentGoalId: number | undefined;
    isRoot: boolean | null;

    constructor(title: string | null, text: string | null, parentGoalId: number | undefined, isRoot: boolean | null) {
        this.title = title;
        this.text = text;
        this.parentGoalId = parentGoalId;
        this.isRoot = isRoot;
    }
}