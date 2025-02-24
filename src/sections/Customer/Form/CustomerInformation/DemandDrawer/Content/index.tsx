import {
    IconButton,
    Tabs,
    Stack,
    Typography,
    SxProps,
    Theme,
} from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { SpaceBetween } from "@/components/styled";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import dynamic from "next/dynamic";
import AddButton from "./AddButton";
import getTab from "./getTab";
import useTabControl from "./useTabControl";
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

const Content: FC<Props> = ({ onClose }) => {
    const { t } = useTranslation();

    const { tabsRef, index, isIndexSafe, fields, changeTab, removeTab } =
        useTabControl();

    return (
        <>
            <SpaceBetween alignItems="center">
                <Typography variant="h6">{t("Demands")}</Typography>

                <Stack direction="row" spacing={1} alignItems="center">
                    <AddButton tabsRef={tabsRef} />
                    <IconButton onClick={onClose} sx={CloseButtonSx}>
                        <CloseOutlinedIcon />
                    </IconButton>
                </Stack>
            </SpaceBetween>

            <Stack borderBottom={1} borderColor="divider" direction="row">
                <Tabs value={index} onChange={changeTab}>
                    {fields.map(getTab(removeTab))}
                </Tabs>
            </Stack>

            {isIndexSafe ? <DemandForm index={index} /> : null}
        </>
    );
};
export default Content;
