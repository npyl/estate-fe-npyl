import LanguageButton from "@/components/LanguageButton";
import { PreferredLanguageType } from "@/types/enums";
import { TLanguageType } from "@/types/translation";
import { useCallback } from "react";
import { useFormContext, useWatch } from "react-hook-form";

const RHFLanguageButton = () => {
    const { setValue } = useFormContext();

    const lang =
        (useWatch({ name: "language" }) as PreferredLanguageType) === "ENGLISH"
            ? "en"
            : "el";

    const setLang = useCallback(
        (l: TLanguageType) =>
            setValue("language", l === "en" ? "ENGLISH" : "GREEK"),
        []
    );

    return (
        <LanguageButton
            updatesGlobalLanguage={false}
            language={lang}
            onLanguageChange={setLang}
        />
    );
};

export default RHFLanguageButton;
