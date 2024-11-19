import {
    Typography,
    Paper,
    IconButton,
    Stack,
    Collapse,
    Divider,
} from "@mui/material";
import SoftButton from "@/components/SoftButton";
import { SpaceBetween } from "@/components/styled";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";
import useToggle from "@/hooks/useToggle";
import { FC, PropsWithChildren, ReactNode } from "react";

interface BaseItemProps extends PropsWithChildren {
    type: string;
    topRightContent?: ReactNode;
    onEdit: VoidFunction;
}

const BaseItem: FC<BaseItemProps> = ({
    type,
    onEdit,
    topRightContent,
    children,
}) => {
    const { t } = useTranslation();
    const [isExpanded, toggle] = useToggle();

    return (
        <Paper elevation={10}>
            <SpaceBetween
                px={2}
                py={1.5}
                alignItems="center"
                gap={1}
                direction="row"
            >
                <Typography variant="h6">{type}</Typography>

                <Stack direction="row" spacing={1}>
                    {isExpanded ? (
                        <>
                            {topRightContent}

                            <SoftButton
                                variant="contained"
                                size="small"
                                onClick={onEdit}
                            >
                                {t("Edit")}
                            </SoftButton>
                        </>
                    ) : null}

                    <IconButton
                        onClick={toggle}
                        sx={{
                            transform: isExpanded
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                            transition: "transform 0.3s ease-in-out",
                        }}
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </Stack>
            </SpaceBetween>
            <Collapse in={isExpanded} timeout="auto" mountOnEnter unmountOnExit>
                <Divider />
                {children}
            </Collapse>
        </Paper>
    );
};

export default BaseItem;
