import { admin_directory_v1 } from "@googleapis/admin";
import { GUserMini } from ".";

const GUserToGUserMini = ({
    id,
    name,
    thumbnailPhotoUrl,
}: admin_directory_v1.Schema$User): GUserMini => {
    const [firstName, lastName] = name?.fullName?.split(" ") || ["", ""];

    return {
        id: id || "",
        firstName,
        lastName,
        avatar: thumbnailPhotoUrl || "",
    };
};

export { GUserToGUserMini };
