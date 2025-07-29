import { Box, SxProps, Theme, Button } from "@mui/material";
import { forwardRef } from "react";
import { useAuth } from "@/hooks/use-auth"; // Hook to get logged-in user
import { useTranslation } from "react-i18next";
import ManagerAutocomplete, { ManagerAutocompleteProps } from "./Manager";

const AssignToMeButtonSx: SxProps<Theme> = {
    textTransform: "none",
    fontSize: "0.875rem",
    backgroundColor: "transparent",
    ":hover": {
        backgroundColor: "transparent !important",
        textDecoration: "underline",
    },
};

// -------------------------------------------------------------------------

interface AssigneeAutocompleteProps extends ManagerAutocompleteProps {
    label: string;
    error?: boolean;
    helperText?: string;
    // ...
    assignToMe?: boolean;
}

const AssigneeAutocomplete = forwardRef<
    HTMLDivElement,
    AssigneeAutocompleteProps
>(({ label, error = false, helperText, assignToMe = false, ...props }, ref) => {
    const { t } = useTranslation();

    const { user } = useAuth();

    const handleAssignToMe = () => {
        if (!user) return;
        props.onChange?.(user?.id);
    };

    return (
        <Box>
            <ManagerAutocomplete ref={ref as any} {...props} />

            {assignToMe && user ? (
                <Button
                    variant="text"
                    color="primary"
                    sx={AssignToMeButtonSx}
                    onClick={handleAssignToMe}
                >
                    {t("Assign to me")}
                </Button>
            ) : null}
        </Box>
    );
});

AssigneeAutocomplete.displayName = "AssigneeAutocomplete";

export default AssigneeAutocomplete;
