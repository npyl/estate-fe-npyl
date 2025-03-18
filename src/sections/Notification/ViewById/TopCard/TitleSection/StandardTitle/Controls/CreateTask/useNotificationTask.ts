import { ContactNotificationExtended } from "@/types/notification";
import { IKanbanCard } from "@/types/tasks";
import { TLanguageType, TranslationType } from "@/types/translation";
import { ICustomerMini } from "@/types/customer";
import {
    IPropertyForNotification,
    NotificationType,
    TTourType,
} from "@/types/notification/notification";
import { IUser } from "@/types/user";
import useGetNotification from "@/sections/Notification/useGetNotification";
import { useLazyFindByEmailQuery } from "@/services/customers";
import { useLazyGetPropertyByCodeQuery } from "@/services/properties";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import plainTextToJSON from "@/components/Editor/util/plainText2JSON";
import { format } from "date-fns";

// ------------------------------------------------------------------------

const getDate = (lang: TLanguageType, tourTime: string, tourDate: string) => {
    if (!tourDate || !tourTime) return "";

    // Format date with translation support
    const formattedDate = format(new Date(tourDate), "d MMMM yyyy");

    return `${formattedDate} ${tourTime}`;
};

const getDescription = (
    t: TranslationType,
    lang: TLanguageType,
    // ...
    message: string | undefined = "",
    name: string | undefined = "",
    email: string | undefined = "",
    mobile: string | undefined = "",
    // ...
    tourType: TTourType | undefined,
    tourTime: string | undefined,
    tourDate: string | undefined
) => {
    const CONTACT_DETAILS = t("Contact Details");
    const FULLNAME = t("Full Name");
    const MOBILE = t("Mobile");

    const TOUR_TYPE = tourType ? t(tourType) : "";
    const AT = t("at");

    const TOUR_DETAILS = `${TOUR_TYPE} ${AT} ${getDate(
        lang,
        tourTime,
        tourDate
    )}`;

    const raw = `${message}\n\n${TOUR_DETAILS}\n\n${CONTACT_DETAILS}:\n${FULLNAME}: \t${name}\nEmail: \t${email}\n${MOBILE}: \t${mobile}`;

    try {
        return plainTextToJSON(raw);
    } catch (ex) {
        return undefined;
    }
};

// ------------------------------------------------------------------------

interface IPropertyMini {
    id: number;
    code: string;
    image: string;
}

const getName0 = (type: NotificationType) => {
    switch (type) {
        case "TOUR":
            return "Tour request";
        case "REVIEW":
            return "Review request";
        case "LISTING":
            return "Listing from";
        case "WORK_FOR_US":
            return "Work application by";
        case "AGREEMENT":
            return "Agreement";
        case "STAY_UPDATED":
            return "Stay Updated";
        default:
            return "Task";
    }
};

const getName1 = (
    code: string | undefined,
    type: string,
    WORK_FOR_US_CASE: string,
    DEFAULT_CASE: string
) => {
    if (code) return code;

    switch (type) {
        case "WORK_FOR_US":
        case "LISTING":
            return WORK_FOR_US_CASE;
        default:
            return DEFAULT_CASE;
    }
};

const IPropertiesToPropertyMini = ({ id, code }: IPropertyForNotification) => ({
    id,
    code,
    image: "",
});

const getTaskForNotification = (
    t: TranslationType,
    lang: TLanguageType,
    propertyTile: string | undefined,
    property: IPropertyMini | undefined,
    {
        customerEmail,
        customerMobile,
        customerName,
        // ...
        message,
        // ...
        type,
        tourType,
        // ...
        tourTime,
        tourDate,
    }: ContactNotificationExtended,
    customer: ICustomerMini | undefined,
    manager: IUser | undefined
): Partial<IKanbanCard> => {
    const NAME_0 = t(getName0(type.key));
    const NAME_1 = getName1(
        property?.code,
        type.key,
        customerName || "-",
        propertyTile || customerName || "-"
    );

    const name = `${NAME_0} ${NAME_1}`;

    const description = getDescription(
        t,
        lang,
        // ...
        message,
        customerName,
        customerEmail,
        customerMobile,
        // ...
        tourType,
        tourTime,
        tourDate
    );

    return {
        name,
        description,
        customers: customer ? [customer] : [],
        properties: property ? [property] : [],
        assignees: manager ? [manager] : [],
        priority: 1,
    };
};

// --------------------------------------------------------------------------------------

const useNotificationTask = () => {
    const { t, i18n } = useTranslation();
    const { notification } = useGetNotification();

    const [findByEmail] = useLazyFindByEmailQuery();
    const [propertyByCode] = useLazyGetPropertyByCodeQuery();

    const getter = useCallback(async () => {
        if (!notification) return;

        const { customerEmail, property, propertyCode } = notification;

        const lang = i18n.language === "en" ? "en" : "el";
        const propertyTitle =
            notification?.property?.descriptions?.[lang].title;

        let customer: ICustomerMini | undefined = undefined;
        let manager: IUser | undefined = undefined;

        const propertyMini = property
            ? IPropertiesToPropertyMini(property)
            : undefined;

        try {
            // INFO: attempt to find customer with this email!
            if (customerEmail) {
                customer = await findByEmail(customerEmail).unwrap();
            }

            // INFO: attempt to get property by code, then find manager
            if (propertyCode) {
                const property = await propertyByCode(propertyCode).unwrap();

                manager = property?.manager;
            }
        } catch (ex) {
            // ...
        }

        // TODO: this is supported by our Dialog; Probably find a better way though...
        return getTaskForNotification(
            t,
            i18n.language,
            // ...
            propertyTitle,
            propertyMini,
            // ...
            notification,
            customer,
            manager
        ) as IKanbanCard;
    }, [t, i18n.language, notification]);

    return { getter };
};

export default useNotificationTask;
