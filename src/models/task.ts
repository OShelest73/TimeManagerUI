export interface Task{
    id: number;
    taskName: string;
    description: string;
    notes: string;
    startDate: Date;
    finishDate: Date;
    status: string;
    storyPoint: number;
}