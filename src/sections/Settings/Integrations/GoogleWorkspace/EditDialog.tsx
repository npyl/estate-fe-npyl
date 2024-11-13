import { useUpdateGoogleWorkspaceIntegration } from "@/services/company";
import { FC } from "react";

interface Props {
    onClose: VoidFunction;
}

const EditDialog: FC<Props> = ({ onClose }) => {
    const [update, { isLoading }] = useUpdateGoogleWorkspaceIntegration();

    return null;
};

export default EditDialog;
