import { EditorRef } from "@/components/Editor";
import { useLazyGetPropertyByIdQuery } from "@/services/properties";
import JSONParseSafe from "@/utils/JSONParseSafe";
import { Content } from "@tiptap/react";
import { useRouter } from "next/router";
import { RefObject, useCallback, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const useGetDescription = (editorRef: RefObject<EditorRef>) => {
    const { i18n } = useTranslation();
    const [title, setTitle] = useState("");

    const router = useRouter();
    const { propertyId } = router.query;
    const [getProperty] = useLazyGetPropertyByIdQuery();

    const fetchAndFill = useCallback(
        async (lang: string) => {
            const res = await getProperty(+propertyId!).unwrap();
            if (!res) return;

            const { descriptions } = res;

            // no elements
            if (Object.entries(descriptions).length === 0) return;

            const selected = descriptions[lang];
            if (!selected) return;

            const { description, title } = selected;
            const sDescription = JSONParseSafe<Content>(description);

            setTitle(title);
            editorRef.current?.commands.setContent(sDescription);
        },
        [propertyId]
    );

    useLayoutEffect(() => {
        fetchAndFill(i18n.language);
    }, [i18n.language, propertyId]);

    return { title };
};
