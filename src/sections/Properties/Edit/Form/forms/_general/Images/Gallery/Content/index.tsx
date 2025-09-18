import { Button, Stack, Skeleton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import DescriptionField from "./DescriptionField";
import { RHFTextField } from "@/components/hook-form";
import { LoadingButton } from "@mui/lab";
import ICarouselImage from "@/components/Carousel/types";
import Carousel from "@/components/Carousel";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import useConditionalMemo from "@/hooks/useConditionalMemo";
import { useEditPropertyImageMutation } from "@/services/properties";
import usePropertyImages from "../../hook";
import { useFormContext } from "react-hook-form";
import { FormValues } from "../types";
import RadioGroup from "./RadioGroup";
import RHFLanguageButton from "./RHFLanguageButton";

interface ContentProps {
    currentImageKey: string;
    setCurrentImageKey: (s: string) => void;
}

const Content: FC<ContentProps> = ({ currentImageKey, setCurrentImageKey }) => {
    const { t } = useTranslation();

    const { images, propertyId, isLoading } = usePropertyImages();

    const methods = useFormContext<FormValues>();
    const isDirty = methods.formState.isDirty;
    const handleClear = () => methods.reset();

    // Update Carousel Index *ONLY* if we have a seriously valid index
    const carouselIndex = useConditionalMemo(
        () => images.findIndex((e) => e.key === currentImageKey),
        (newValue) => newValue !== -1,
        [currentImageKey, images]
    );

    const [editImage, { isLoading: isUpdating }] =
        useEditPropertyImageMutation();

    const handleUpdate = () => {
        const { language, ...values } = methods.getValues();

        editImage({
            id: propertyId,
            body: {
                key: currentImageKey,
                ...values,
            },
        });
    };

    const handleImageChange = useCallback(
        (i: ICarouselImage) => setCurrentImageKey(i.key!),
        []
    );

    return (
        <Grid container spacing={1}>
            <Grid xs={12} md={10}>
                <Carousel
                    onImageChange={handleImageChange}
                    mainLabel={t("_main_").toString()}
                    data={images as ICarouselImage[]}
                    initialIndex={carouselIndex}
                />
            </Grid>
            <Grid xs={12} md={2} display="flex" flexDirection="column" gap={1}>
                <RHFLanguageButton
                    name="language"
                    updatesGlobalLanguage={false}
                    sx={{ mt: 1, alignSelf: "flex-end", width: "max-content" }}
                />

                {isLoading ? (
                    <>
                        <Skeleton width="100%" height="30px" />
                        <Skeleton width="100%" height="30px" />
                        <Skeleton width="100%" height="30px" />
                    </>
                ) : (
                    <>
                        <RHFTextField
                            fullWidth
                            label={t("Title")}
                            name="title"
                        />

                        <DescriptionField
                            fullWidth
                            label={t("Description")}
                            name="description"
                            multiline
                            rows={5}
                        />

                        <RadioGroup />
                    </>
                )}

                {isDirty ? (
                    <Stack
                        direction="row"
                        justifyContent="right"
                        spacing={1}
                        mt={2}
                    >
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleClear}
                        >
                            {t("Clear")}
                        </Button>

                        <LoadingButton
                            variant="contained"
                            color="secondary"
                            loading={isUpdating}
                            disabled={isUpdating}
                            onClick={handleUpdate}
                        >
                            {t("Update")}
                        </LoadingButton>
                    </Stack>
                ) : null}
            </Grid>
        </Grid>
    );
};

export default Content;
