import { admin_directory_v1 } from "@googleapis/admin";
import { GUserMini } from ".";

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

export { GUserToGUserMini };
