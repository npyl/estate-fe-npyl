import { File } from "./file";

export interface ICourseForm {
    id: number | null;
    title: string;
    department: string;
    semester?: string;
    description?: string;
}
export interface Courses {
    courseImage: any;
    courseForm: any;
}

export interface GetAllCoursesResponse {
    id: number;
    title: string;
    departmentId?: number | null;
    semester?: number | null;
    description?: string | null;
    image: any;
    chapters?: any;
    department?: any;
    courseContent?: any;
    coursePublication?: PublishCourse;
    relatedCourseId?: number | null;
}

export interface PublishCourse {
    courseId?: string | string[] | undefined;
    isPrivate: boolean;
}

export interface IJoinCourse {
    userId: number;
    message: string;
    courseId: number;
}
export interface ICreateGroup {
    groupImage: any;
    groupForm: {
        name: string;
        departmentId: 1;
        courseId: string;
        comment: string;
        members: string[];
    };
}
export interface IGetMembersReq {
    id: number;
    username: string;
    image: any;
}

export interface IGroup {
    courseId: number;
    createDate: string;
    departmentId: number;
    groupImage: { name: string; imageBinary: string; imageType: string | null };
    groupName: string;
    id: number;
    members: any[];
    sessions: any[];
}
