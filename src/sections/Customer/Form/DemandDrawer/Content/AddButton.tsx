import { Button } from "@mui/material";
import { FC, RefObject, useCallback } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useTranslation } from "react-i18next";
import { TabsRef } from "./types";

interface AddButtonProps {
    tabsRef: RefObject<TabsRef>;
}

const AddButton: FC<AddButtonProps> = ({ tabsRef }) => {
    const { t } = useTranslation();

    const handleClick = useCallback(() => tabsRef.current?.add(), []);

    return (
        <Button
            startIcon={<AddCircleOutlineOutlinedIcon />}
            onClick={handleClick}
        >
            {t("Add")}
        </Button>
    );
};

export default AddButton;
