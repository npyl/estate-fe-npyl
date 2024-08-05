import { LanguageButton } from "@/components/Language/LanguageButton";
import { PreferredLanguageType } from "@/types/enums";
import { TLanguageType } from "@/types/translation";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";

const RHFLanguageButton = () => {
    const { watch, setValue } = useFormContext();

    const lang =
        (watch("language") as PreferredLanguageType) === "ENGLISH"
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
