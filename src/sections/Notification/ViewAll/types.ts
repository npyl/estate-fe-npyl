import { NotificationType } from "@/types/notification";

interface INotificationTab {
    label: string;
    type: NotificationType;
}

type TViewFilter = "all" | "viewed" | "notViewed";

export type { INotificationTab, TViewFilter };
