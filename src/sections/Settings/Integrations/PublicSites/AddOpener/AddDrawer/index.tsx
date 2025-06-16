import { FC } from "react";
import { Drawer, DrawerProps, Typography } from "@mui/material";
import { makeStickyBottom } from "@/ui/FormBottomBar";
import { useTranslation } from "react-i18next";
import Form from "./Form";
import SubmitButton from "./SubmitButton";
import { RHFTextField } from "@/components/hook-form";

const PaperProps: DrawerProps["PaperProps"] = {
    sx: {
        p: 1,

        width: {
            xs: "100vw",
            lg: "30vw",
        },

        ...makeStickyBottom,
    },
};

interface AddDrawerProps {
    onClose: () => void;
}

const AddDrawer: FC<AddDrawerProps> = ({ onClose }) => {
    const { t } = useTranslation();
    return (
        <Drawer open anchor="right" PaperProps={PaperProps} onClose={onClose}>
            <Form>
                <Typography variant="h6" p={1}>
                    {t("Add public site")}
                </Typography>
                <RHFTextField name="siteUrl" label={t("Url")} />
                <SubmitButton />
            </Form>
        </Drawer>
    );
};

export default AddDrawer;
