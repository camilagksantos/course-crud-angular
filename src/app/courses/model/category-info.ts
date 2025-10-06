import { ICourse } from "./course";

export interface ICategoryInfo {
    key: string;
    label: string;
    icon: string;
    color: string;
    description: string;
    courses: ICourse[];
    coursesCount: number;
    lessonsCount: number;
}
