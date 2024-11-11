import { admin_directory_v1 } from "@googleapis/admin";
import { GUserMini } from ".";
import { GoogleCalendarUserInfo } from "@/types/calendar/google";

const GUserToGUserMini = ({
    name,
    primaryEmail,
    thumbnailPhotoUrl,
}: admin_directory_v1.Schema$User): GUserMini => {
    const [firstName, lastName] = name?.fullName?.split(" ") || ["", ""];

    return {
        id: primaryEmail!,
        firstName,
        lastName,
        avatar: thumbnailPhotoUrl || "",
    };
};

const UserInfoToGUserMini = ({
    email,
    name,
    picture,
}: GoogleCalendarUserInfo): GUserMini => {
    const [firstName, lastName] = name?.split(" ") || ["", ""];

    return {
        id: email,
        firstName,
        lastName,
        avatar: picture,
    };
};

export { GUserToGUserMini, UserInfoToGUserMini };
