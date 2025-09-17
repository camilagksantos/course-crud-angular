export interface ICourseWithLessonsResponse {
    course: {
        _id: string;
        name: string;
        category: string;
    };
    lessons: Array<{
        id: string;
        name: string;
        youtubeUrl: string;
    }>;
}
