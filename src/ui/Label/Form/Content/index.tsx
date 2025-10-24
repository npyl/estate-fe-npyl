import { useTranslation } from "react-i18next";
import RHFTextField from "@/components/hook-form/RHFTextField";
import RHFColorPicker from "@/components/hook-form/RHFColorPicker";
import Preview from "./Preview";
import Resource from "./Resource";
import { FC } from "react";
import Assign from "./Assign";

interface Props {
    assign: boolean;
    isEdit: boolean;
}

const Content: FC<Props> = ({ assign, isEdit }) => {
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

            <RHFColorPicker name="color" />

            <Preview />

            {assign ? <Assign /> : null}
        </>
    );
};

export default Content;
