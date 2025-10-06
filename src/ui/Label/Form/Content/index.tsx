import { useTranslation } from "react-i18next";
import RHFTextField from "@/components/hook-form/RHFTextField";
import RHFColorPicker from "./RHFColorPicker";
import Preview from "./Preview";
import Resource from "./Resource";
import { FC } from "react";
import Assign from "./Assign";

interface Props {
    isEdit: boolean;
}

const Content: FC<Props> = ({ isEdit }) => {
    const { t } = useTranslation();

    return (
        <>
            {!isEdit ? <Resource /> : null}

            <RHFTextField
                fullWidth
                label={t("Title")}
                name="name"
                variant="outlined"
            />

            <RHFColorPicker />

            <Preview />

            <Assign />
        </>
    );
};

export default Content;
