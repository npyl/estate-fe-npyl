import {
    IconButton,
    Tabs,
    Stack,
    Typography,
    SxProps,
    Theme,
} from "@mui/material";
import { useCallback, useState } from "react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { SpaceBetween } from "@/components/styled";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import dynamic from "next/dynamic";
import AddButton from "./AddButton";
import getTab from "./getTab";
import { useFieldArrayContext } from "@/components/hook-form/FieldArrayContext";
const DemandForm = dynamic(() => import("./Form"));

const CloseButtonSx: SxProps<Theme> = {
    display: {
        xs: "block",
        lg: "none",
    },
};

interface Props {
    onClose: VoidFunction;
}

const DemandSection: FC<Props> = ({ onClose }) => {
    const { t } = useTranslation();

    const { fields } = useFieldArrayContext();

    const [index, setIndex] = useState(0);
    const handleTabChange = useCallback((_: any, v: number) => setIndex(v), []);

    const handleBeforeRemove = (index: number) => {
        const lastIdx = fields.length - 1;
        if (lastIdx !== index) return;
        setIndex(index - 1);
    };

    return (
        <>
            <SpaceBetween alignItems="center">
                <Typography variant="h6">{t("Demands")}</Typography>

                <Stack direction="row" spacing={1} alignItems="center">
                    <AddButton />

                    <IconButton onClick={onClose} sx={CloseButtonSx}>
                        <CloseOutlinedIcon />
                    </IconButton>
                </Stack>
            </SpaceBetween>

            <Stack borderBottom={1} borderColor="divider" direction="row">
                <Tabs value={index} onChange={handleTabChange}>
                    {fields.map(getTab(handleBeforeRemove))}
                </Tabs>
            </Stack>

            {fields.length > 0 ? <DemandForm index={index} /> : null}
        </>
    );
};
export default DemandSection;
