export interface IGetNotifications {
    status: number;
    notifications: INotifications[];
}
export interface INotifications {
    body: string;
    connect_id: string;
    deliveredAt: string;
    event: string | null;
    id: number;
    to_user: string;
    viewed: number;
}

export interface INotificationBody {
    course_title: string;
    event: EventTypes;
    from_user: string;
}

export enum EventTypes {
    JOIN_COURSE = "join_course",
}
