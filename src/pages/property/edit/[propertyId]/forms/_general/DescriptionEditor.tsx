import { LoadingButton } from "@mui/lab";
import { Typography } from "@mui/material";
import {
    ContentState,
    EditorState,
    convertFromRaw,
    convertToRaw,
} from "draft-js";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Panel from "src/components/Panel";
import { DraftEditor } from "src/components/draft-editor";
import { RHFTextField } from "src/components/hook-form";
import { useGenerateDescriptionMutation } from "src/services/properties";
import { IOpenAIDetailsPOST } from "src/types/openai";
import { useDebouncedCallback } from "use-debounce";

const useOpenAIDetails = (): { openAIDetails: IOpenAIDetailsPOST } => {
    const { watch } = useFormContext();

    return {
        openAIDetails: {
            category: watch("category"),
            state: watch("state"),
            price: watch("price"),
            location: watch(""),
            plotArea: watch("plotArea"),
            yearOfConstruction: watch("construction.yearOfConstruction"),
            yearOfRenovation: watch("construction.yearOfRenovation"),
            furnished: watch("technicalFeatures.furnished"),
            floor: watch("details.floor"),
            layers: watch("details.layers"),
            kitchens: watch("details.kitchens"),
            bathrooms: watch("details.bathrooms"),
            livingrooms: watch("details.livingrooms"),
            frameType: watch("technicalFeatures.frameType"),
            floorType: watch("technicalFeatures.floorType"),
            energyClass: watch("heatingAndEnergy.energyClass"),
            balconies: watch("areas.balconies"),

            attic: watch("details.attic"),
            storeroom: watch("details.storeroom"),
            safetyDoor: watch("technicalFeatures.safetyDoor"),
            fireplace: watch("technicalFeatures.fireplace"),
            suitableForStudent: watch("suitableFor.student"),
            pool: watch("features.pool"),

            distanceFromPublicTransportation: watch(
                "distances.publicTransport"
            ),
            distanceFromSea: watch("distances.sea"),
            distanceFromSupermarket: watch("distances.supermarket"),

            language: "Greek",
        },
    };
};

const DescriptionSection: React.FC = () => {
    const { t } = useTranslation();
    const { watch, setValue } = useFormContext();

    const [generateDescription, { isLoading }] =
        useGenerateDescriptionMutation();

    const { openAIDetails } = useOpenAIDetails();
    const description = watch("description");

    const [editorState, setEditorState] = useState<EditorState>(
        EditorState.createEmpty()
    );

    const onEditorStateChange = useCallback((newEditorState: EditorState) => {
        setEditorState(newEditorState);
        debouncedSetDescription(newEditorState);
    }, []);

    // first load
    useEffect(() => {
        if (!description) return;

        // convert description (string representing JSON) to JSON and set state
        const contentState = convertFromRaw(JSON.parse(description));
        setEditorState(EditorState.createWithContent(contentState));
    }, []);

    const debouncedSetDescription = useDebouncedCallback(
        (newEditorState: EditorState) => {
            const contentState = newEditorState.getCurrentContent();
            const plainText = contentState.getPlainText();
            setValue("descriptionText", plainText);

            const contentStateJSON = JSON.stringify(convertToRaw(contentState));
            setValue("description", contentStateJSON);
        },
        100 // the delay in ms
    );

    const handleGenerate = useCallback(
        () =>
            generateDescription(openAIDetails)
                .unwrap()
                .then((s) => {
                    const contentState = ContentState.createFromText(s);
                    setEditorState(EditorState.createWithContent(contentState));
                }),
        [openAIDetails]
    );

    return (
        <Panel
            label={t("Title")}
            endNode={
                <LoadingButton
                    loading={isLoading}
                    loadingPosition="start"
                    variant="outlined"
                    onClick={handleGenerate}
                >
                    {isLoading ? t("Generating...") : t("Generate Description")}
                </LoadingButton>
            }
        >
            <RHFTextField fullWidth name="title" />

            <Typography variant="h6" flex={1}>
                {t("Description")}
            </Typography>
            <DraftEditor
                sx={{
                    minHeight: "200px",
                }}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
            />
        </Panel>
    );
};

export default DescriptionSection;
