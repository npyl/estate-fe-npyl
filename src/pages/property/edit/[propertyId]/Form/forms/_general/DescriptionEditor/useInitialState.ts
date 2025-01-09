import {
    ContentState,
    EditorState,
    convertFromRaw,
    convertToRaw,
} from "draft-js";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useLazyGetPropertyByIdQuery } from "src/services/properties";
import { IProperties } from "src/types/properties";
import { TABS } from "./constants";

const useInitialDescriptionState = (
    setEditorState: (s: EditorState) => void
) => {
    const { setValue } = useFormContext();
    const { propertyId } = useRouter().query;
    const [getProperty] = useLazyGetPropertyByIdQuery();

    const setInitialState = useCallback((p: IProperties) => {
        const descriptions = p?.descriptions || [];

        Object.entries(descriptions)?.forEach(
            ([lang, { description, title }]) => {
                const i = TABS.findIndex(({ value }) => value === lang);

                const state = description
                    ? convertFromRaw(JSON.parse(description))
                    : ContentState.createFromText("");

                const plainText = state.getPlainText();
                const contentStateJSON = JSON.stringify(convertToRaw(state));

                setValue(`descriptions[${i}].descriptionText`, plainText);
                setValue(`descriptions[${i}].description`, contentStateJSON);
                setValue(`descriptions[${i}].title`, title);

                if (i === 0)
                    setEditorState(EditorState.createWithContent(state));
            }
        );
    }, []);

    useEffect(() => {
        getProperty(+propertyId!).unwrap().then(setInitialState);
    }, []);
};

export default useInitialDescriptionState;
