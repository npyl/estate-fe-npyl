export interface ContactNotificationPOST {
	customerName?: string;
	customerEmail?: string;
	customerMobile?: string;
	message?: string;

	propertyCode?: string;
	tourDate?: string;
	tourTime?: string;
	tourType?: string;
}

export interface ContactNotification {
	customerName: string;
	customerEmail: string;
	customerMobile: string;
	message: string;

	propertyCode: string;
	tourDate: string;
	tourTime: string;
	tourType: string;

	notificationDate: string;
	viewed: boolean;

	notificationType: string;
}
