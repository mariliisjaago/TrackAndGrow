export class Goal {
    id: number;
    createdDate: Date;
    modifiedDate: Date;
    firstChildId: number;
    nextSiblingId: number;
    firstChild: Goal | null;
    nextSibling: Goal | null;
    infoStr: string;
    type: string;
    title: string;
    content: string;
    isCompleted: boolean;
    completedDate: Date | undefined;

    constructor(
        id: number,
        createdDate: Date,
        modifiedDate: Date,
        firstChildId: number,
        nextSiblingId: number,
        firstChild: Goal | null,
        nextSibling: Goal | null,
        infoStr: string,
        type: string,
        title: string,
        content: string,
        isCompleted: boolean,
        completedDate: Date | undefined
    ) {
        this.id = id;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.firstChildId = firstChildId;
        this.nextSiblingId = nextSiblingId;
        this.firstChild = firstChild;
        this.nextSibling = nextSibling;
        this.infoStr = infoStr;
        this.type = type;
        this.title = title;
        this.content = content;
        this.isCompleted = isCompleted;
        this.completedDate = completedDate;
    }
}