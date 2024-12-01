export class GoalV2 {
  id: number;
  createdDate: Date;
  modifiedDate: Date;
  completedDate?: Date | null; 
  firstChildId?: number | null; 
  firstChild?: GoalV2 | null; 
  nextSiblingId?: number | null;
  nextSibling?: GoalV2 | null;
  type?: string | null;
  title?: string | null;
  content: string;
  isCompleted: boolean;
  isRoot: boolean;
  userId: number;

  constructor(
    id: number,
    createdDate: Date,
    modifiedDate: Date,
    content: string,
    isCompleted: boolean,
    isRoot: boolean,
    userId: number,
    completedDate?: Date | null,
    firstChildId?: number | null,
    firstChild?: GoalV2 | null,
    nextSiblingId?: number | null,
    nextSibling?: GoalV2 | null,
    type?: string | null,
    title?: string | null
  ) {
    this.id = id;
    this.createdDate = createdDate;
    this.modifiedDate = modifiedDate;
    this.completedDate = completedDate;
    this.firstChildId = firstChildId;
    this.firstChild = firstChild;
    this.nextSiblingId = nextSiblingId;
    this.nextSibling = nextSibling;
    this.type = type;
    this.title = title;
    this.content = content;
    this.isCompleted = isCompleted;
    this.isRoot = isRoot;
    this.userId = userId;
  }
}