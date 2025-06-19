import BaseAvatarPicker from "@/ui/AvatarPicker";
import {
    useUploadAvatarMutation,
    useRemoveAvatarMutation,
} from "@/services/customers";
import { FC, useCallback } from "react";
import { ICustomer } from "@/types/customer";

interface AvatarPickerProps {
    c?: ICustomer;
}

const AvatarPicker: FC<AvatarPickerProps> = ({ c }) => {
    const [upload, { isLoading: isLoading0 }] = useUploadAvatarMutation();
    const [remove, { isLoading: isLoading1 }] = useRemoveAvatarMutation();
    const isLoading = isLoading0 || isLoading1;
    const onSelect = useCallback(
        (file: File) => upload({ customerId: c?.id!, file }),
        [c?.id]
    );
    const onDelete = useCallback(() => remove(c?.id!), [c?.id]);
    return (
        <BaseAvatarPicker
            src={c?.customerAvatar}
            // ...
            isLoading={isLoading}
            onSelect={onSelect}
            onDelete={onDelete}
        />
    );
};

export default AvatarPicker;
