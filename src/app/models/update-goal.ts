export class UpdateGoal {
    id: number;
    isCompleted: boolean;
    completedDate: Date;

    constructor(id: number, isCompleted: boolean, completedDate: Date) {
        this.id = id;
        this.isCompleted = isCompleted;
        this.completedDate = completedDate;
    }
}