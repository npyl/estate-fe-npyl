import { FC } from "react";
import BaseItem from "../BaseItem";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useIsGoogleWorkspaceIntegrated } from "@/services/company";

interface PlaceholderProps extends TypographyProps {
    integrated: boolean;
}
const Placeholder: FC<PlaceholderProps> = ({ integrated, ...props }) => {
    const { t } = useTranslation();

    if (integrated)
        return (
            <Typography {...props}>
                {t("Integrated. You can change workspace if you'd like.")}
            </Typography>
        );

    return (
        <Typography {...props}>
            {t(
                "Not integrated. Please edit to support features like Calendar."
            )}
        </Typography>
    );
};

interface ItemProps {
    onEdit: VoidFunction;
}

const Item: FC<ItemProps> = ({ onEdit }) => {
    const { isIntegrated } = useIsGoogleWorkspaceIntegrated();

    return (
        <BaseItem type="Google Workspace" onEdit={onEdit}>
            <Placeholder
                integrated={isIntegrated}
                p={2}
                variant="body1"
                color="text.secondary"
            />
        </BaseItem>
    );
};

export default Item;
