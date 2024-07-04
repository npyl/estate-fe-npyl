import { Grid, Button, Stack, MenuItem, Skeleton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { SoftButton } from "@/components/SoftButton";
import { useCallback, useMemo } from "react";
import {
    useDeletePropertyImageMutation,
    useEditPropertyImageMutation,
} from "@/services/properties";

import CarouselSimple from "@/components/CarouselSimple";
import ICarouselImage from "@/components/carousel/types";
import { LanguageButton } from "@/components/Language/LanguageButton";
import { useConditionalMemo } from "@/hooks/useConditionalMemo";
import usePropertyImages from "../hook";
import { StyledDialog, DescriptionField } from "./styled";
import { FormProvider, useForm } from "react-hook-form";
import { DialogProps } from "@/components/Dialog";
import { RHFTextField } from "@/components/hook-form";

interface FormValues {
    title: string;
    description: string;
    hidden: boolean;
    language: string;
}

interface GalleryProps extends Omit<DialogProps, "onChange" | "onClose"> {
    currentImageKey: string;
    onClose: VoidFunction;
}

const Gallery: React.FC<GalleryProps> = ({
    currentImageKey,
    onClose,
    ...props
}) => {
    const { images, propertyId, isLoading } = usePropertyImages();

    const [deleteImage, { isLoading: isDeleting }] =
        useDeletePropertyImageMutation();
    const [editImage, { isLoading: isUpdating }] =
        useEditPropertyImageMutation();

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

    const handleUpdate = useCallback(() => {}, []);

    const handleImageChange = (i: ICarouselImage) => {
        // onChange(i.key!);
    };

    const handleDelete = () => {};

    return (
        <FormProvider {...methods}>
            <StyledDialog
                {...props}
                // ...
                submit
                onSubmit={methods.handleSubmit(handleUpdate)}
                // ...
                closeAfterTransition={true}
                title={
                    <>
                        Gallery Manager
                        <LanguageButton
                            updatesGlobalLanguage={false}
                            sx={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                            }}
                            onLanguageChange={handleLanguageChange}
                        />
                    </>
                }
                content={
                    <Grid container spacing={1}>
                        <Grid item xs={10} position={"relative"}>
                            <CarouselSimple
                                onImageChange={handleImageChange}
                                mainLabel="main"
                                data={images as ICarouselImage[]}
                                initialIndex={carouselIndex}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={2}
                            component={Stack}
                            direction="column"
                            gap={1}
                            mt={1}
                        >
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

                                    {/* TODO: ... */}
                                    <RHFTextField
                                        fullWidth
                                        select
                                        label="Visibility"
                                        name="hidden"
                                    >
                                        <MenuItem value="public">
                                            Public
                                        </MenuItem>
                                        <MenuItem value="private">
                                            Private
                                        </MenuItem>
                                    </RHFTextField>
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
                                        disabled={isLoading}
                                    >
                                        Clear
                                    </Button>

                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        type="submit"
                                        disabled={isLoading}
                                    >
                                        Update
                                    </Button>
                                </Stack>
                            ) : null}
                        </Grid>
                    </Grid>
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
                            Close
                        </Button>
                    </>
                }
            />
        </FormProvider>
    );
};

export default Gallery;
