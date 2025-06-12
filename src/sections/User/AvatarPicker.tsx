import { FC, useCallback } from "react";
import { IUser } from "src/types/user";
import BaseAvatarPicker from "@/ui/AvatarPicker";
import {
    useRemoveAvatarMutation,
    useUploadAvatarMutation,
} from "@/services/user";

interface AvatarPickerProps {
    user?: IUser;
}

const AvatarPicker: FC<AvatarPickerProps> = ({ user }) => {
    const [uploadAvatar, { isLoading: isUploading }] =
        useUploadAvatarMutation();
    const [removeAvatar, { isLoading: isRemoving }] = useRemoveAvatarMutation();

    const isLoading = isUploading || isRemoving;

    const onSelect = useCallback(
        (file: File) => uploadAvatar({ file, userId: user?.id! }),
        [user?.id]
    );

    const onDelete = useCallback(() => removeAvatar(user?.id!), [user?.id]);

    return (
        <BaseAvatarPicker
            isLoading={isLoading}
            // ...
            src={user?.avatar}
            firstName={user?.firstName}
            lastName={user?.lastName}
            // ...
            onSelect={onSelect}
            onDelete={onDelete}
        />
    );
};

export default AvatarPicker;
