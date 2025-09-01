import { SxProps, Theme, Button } from "@mui/material";
import { FC, useCallback } from "react";
import { useAuth } from "@/sections/use-auth"; // Hook to get logged-in user
import { useTranslation } from "react-i18next";
import isFalsy from "@/utils/isFalsy";

const AssignToMeButtonSx: SxProps<Theme> = {
    textTransform: "none",
    fontSize: "0.875rem",
    backgroundColor: "transparent",
    ":hover": {
        backgroundColor: "transparent !important",
        textDecoration: "underline",
    },
};

interface Props {
    onAssign?: (id: number) => void;
}

const AssignToMe: FC<Props> = ({ onAssign }) => {
    const { t } = useTranslation();

    const { user } = useAuth();

    const handleAssignToMe = useCallback(() => {
        if (isFalsy(user?.id)) return;
        onAssign?.(user?.id!);
    }, [onAssign, user?.id]);

    return (
        <Button
            variant="text"
            color="primary"
            sx={AssignToMeButtonSx}
            onClick={handleAssignToMe}
        >
            {t("Assign to me")}
        </Button>
    );
};

export default AssignToMe;
