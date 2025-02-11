import { Button } from "@mui/material";
import { useCallback } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useTranslation } from "react-i18next";
import { EMTPY_DEMAND } from "./constant";
import { useFieldArrayContext } from "@/components/hook-form/FieldArrayContext";

const AddButton = () => {
    const { t } = useTranslation();
    const { append } = useFieldArrayContext();

    const handleClick = useCallback(() => append(EMTPY_DEMAND), []);

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
