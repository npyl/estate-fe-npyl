import { Grid, Button, Stack, Skeleton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import SoftButton from "@/components/SoftButton";
import { useMemo, useState } from "react";
import {
    useDeletePropertyImageMutation,
    useEditPropertyImageMutation,
} from "@/services/properties";

import CarouselSimple from "@/components/CarouselSimple";
import ICarouselImage from "@/components/carousel/types";
import { LanguageButton } from "@/components/Language/LanguageButton";
import { useConditionalMemo } from "@/hooks/useConditionalMemo";
import usePropertyImages from "../hook";
import {
    StyledDialog,
    DescriptionField,
    StyledContent,
    StyledActions,
} from "./styled";
import { FormProvider, useForm } from "react-hook-form";
import { DialogProps } from "@/components/Dialog";
import { RHFRadioGroup, RHFTextField } from "@/components/hook-form";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { TranslationType } from "@/types/translation";

const getVISIBILITY_OPTIONS = (t: TranslationType) => [
    { label: t("Public"), value: false },
    { label: t("Private"), value: true },
];

interface FormValues {
    title: string;
    description: string;
    hidden: boolean;
    language: string;
}

interface GalleryProps extends Omit<DialogProps, "onChange" | "onClose"> {
    openImageKey: string;
    onClose: VoidFunction;
}

const Gallery: React.FC<GalleryProps> = ({
    openImageKey,
    onClose,
    ...props
}) => {
    const { t } = useTranslation();
    const VISIBILITY_OPTIONS = useMemo(() => getVISIBILITY_OPTIONS(t), [t]);

    const { images, propertyId, isLoading } = usePropertyImages();

    const [deleteImage, { isLoading: isDeleting }] =
        useDeletePropertyImageMutation();
    const [editImage, { isLoading: isUpdating }] =
        useEditPropertyImageMutation();

    // NOTE: Gallery is supposed to be used with the Wrapper => no effect needed here
    const [currentImageKey, setCurrentImageKey] = useState(openImageKey);

    const currentImage = useMemo(
        () => images.find(({ key }) => key === currentImageKey),
        [images, currentImageKey]
    );

    const methods = useForm<FormValues>({
        values: {
            title: currentImage?.title || "",
            description: currentImage?.description || "",
            hidden: !!currentImage?.hidden,
            language: "el",
        },
    });
    const isDirty = methods.formState.isDirty;
    const handleClear = () => methods.reset();
    const handleLanguageChange = (l: string) => methods.setValue("language", l);

    // Update Carousel Index *ONLY* if we have a seriously valid index
    const carouselIndex = useConditionalMemo(
        () => images.findIndex((e) => e.key === currentImageKey),
        (newValue) => newValue !== -1,
        [currentImageKey, images]
    );

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

    const handleImageChange = (i: ICarouselImage) => setCurrentImageKey(i.key!);

    const handleDelete = () => {
        if (!currentImageKey) return;

        // Prepare Next Image to avoid jumping
        const index = images.findIndex((f) => f.key === currentImageKey);
        if (index < 0) return;

        // Normalize if we are hitting last index
        const nextIndex =
            index === images.length - 1 ? images.length - 2 : index + 1;
        const nextImageKey = images.at(nextIndex)?.key || "";

        if (!nextImageKey) return;

        deleteImage({
            propertyId: +propertyId!,
            imageKey: currentImageKey,
        })
            .then(() => setCurrentImageKey(nextImageKey))
            .catch((reason) => console.error("deleteImage: ", reason));
    };

    return (
        <FormProvider {...methods}>
            <StyledDialog
                {...props}
                // ...
                submit
                hideTitle
                maxWidth="xl"
                closeAfterTransition={true}
                DialogContentComponent={StyledContent}
                DialogActionsComponent={StyledActions}
                // ...
                content={
                    <>
                        <Grid container spacing={1}>
                            <Grid item xs={10}>
                                <CarouselSimple
                                    onImageChange={handleImageChange}
                                    mainLabel={t("_main_").toString()}
                                    data={images as ICarouselImage[]}
                                    initialIndex={carouselIndex}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={2}
                                display="flex"
                                flexDirection="column"
                                gap={1}
                            >
                                <LanguageButton
                                    updatesGlobalLanguage={false}
                                    onLanguageChange={handleLanguageChange}
                                    sx={{
                                        alignSelf: "flex-end",
                                        width: "max-content",
                                    }}
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
                                            label="Title"
                                            name="title"
                                        />

                                        <DescriptionField
                                            fullWidth
                                            name="description"
                                            multiline
                                            rows={5}
                                        />

                                        <RHFRadioGroup
                                            name="hidden"
                                            options={VISIBILITY_OPTIONS}
                                        />
                                    </>
                                )}

                                {isDirty ? (
                                    <Stack
                                        direction="row"
                                        justifyContent={"right"}
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
                    </>
                }
                actions={
                    <>
                        <SoftButton
                            color="error"
                            disabled={isDeleting}
                            onClick={handleDelete}
                        >
                            <Delete />
                        </SoftButton>

                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={onClose}
                        >
                            {t("Close")}
                        </Button>
                    </>
                }
            />
        </FormProvider>
    );
};

const RemountWrapper: React.FC<GalleryProps> = (props) =>
    !props.open ? null : <Gallery {...props} />;

export default RemountWrapper;
