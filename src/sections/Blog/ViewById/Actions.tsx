import Link from "@/components/Link";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface Props {
    siteId: number;
}

const CancelButton: FC<Props> = ({ siteId }) => {
    const { t } = useTranslation();
    return (
        <Button LinkComponent={Link} href={`/blog/${siteId}`}>
            {t("Cancel")}
        </Button>
    );
};

const SaveButton = () => {
    const { t } = useTranslation();
    const { formState } = useFormContext();
    const { isLoading } = formState || {};
    return (
        <LoadingButton
            loading={isLoading}
            disabled={isLoading}
            variant="contained"
            type="submit"
        >
            {t("Save")}
        </LoadingButton>
    );
};

const Actions: FC<Props> = ({ siteId }) => (
    <Stack direction="row" justifyContent="flex-end" spacing={1} mt={1}>
        <CancelButton siteId={siteId} />
        <SaveButton />
    </Stack>
);

export default Actions;
