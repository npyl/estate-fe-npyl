import { Stack } from "@mui/material";
import { Language } from "@/components/LanguageButton/types";
import dynamic from "next/dynamic";
import { FC } from "react";
import { useWatch } from "react-hook-form";
import useNames from "../useNames";
const GenerateButton = dynamic(() => import("./GenerateButton"));
const ImproveButton = dynamic(() => import("./ImproveButton"));
const TranslateButton = dynamic(() => import("./TranslateButton"));

interface UpperRightOptionsProps {
    lang: Language;
}

const UpperRightOptions: FC<UpperRightOptionsProps> = ({ lang }) => {
    const canTranslate = lang === "en";

    const { descriptionTextName } = useNames(lang);

    // TODO: make this faster!?
    const isEmpty =
        (useWatch({ name: descriptionTextName }) as string)?.length === 0;

    return (
        <Stack direction="row" spacing={1}>
            {canTranslate ? <TranslateButton /> : null}
            {isEmpty ? <GenerateButton lang={lang} /> : null}
            {!isEmpty ? <ImproveButton lang={lang} /> : null}
        </Stack>
    );
};

export default UpperRightOptions;
