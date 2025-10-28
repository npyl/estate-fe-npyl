import ChatGPTIcon from "@/assets/icons/GPTIcon";
import { useGenerateTitleMutation } from "@/services/properties";
import IconButton from "@mui/material/IconButton";
import useOpenAIDetails from "./UpperRightButtons/useOpenAIDetails";
import { FC, useCallback } from "react";
import { Language } from "@/components/LanguageButton/types";
import { useFormContext } from "react-hook-form";
import { TABS } from "./constants";
import { IPropertyYup } from "@/sections/Properties/Edit/Form/usePropertyForm";

interface Props {
    lang: Language;
}

const GenerateTitleButton: FC<Props> = ({ lang }) => {
    const [generate] = useGenerateTitleMutation();

    const { openAIDetails } = useOpenAIDetails(lang);

    const { setValue } = useFormContext<IPropertyYup>();

    const index = TABS.findIndex(({ value }) => lang === value);

    const onClick = useCallback(async () => {
        const res = await generate(openAIDetails);
        if ("error" in res) return;
        const name = `descriptions.${index}.title` as const;
        setValue(name, res.data, { shouldDirty: true });
    }, [index, openAIDetails]);

    return (
        <IconButton size="small" onClick={onClick}>
            <ChatGPTIcon />
        </IconButton>
    );
};

export default GenerateTitleButton;
