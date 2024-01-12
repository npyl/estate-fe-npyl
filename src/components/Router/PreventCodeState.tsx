import { useSelector } from "react-redux";
import useConditionalRouter from ".";
import { selectAll } from "src/slices/property";
import { useMemo } from "react";
import { NextRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

const usePreventCodeStateRouter = (): NextRouter => {
    const { t } = useTranslation();

    const pathname = usePathname();

    const body = useSelector(selectAll);

    const isCreateOrEditProperty = useMemo(
        () => pathname.includes("property/edit"),
        [pathname]
    );

    const isCodeOrStateEmpty = useMemo(
        () =>
            isCreateOrEditProperty &&
            (body?.code?.length === 0 || body?.state?.length === 0),
        [isCreateOrEditProperty, body?.code, body?.state]
    );

    const router = useConditionalRouter(
        isCodeOrStateEmpty,
        t("Fill in Code and State!").toString()
    );

    return router;
};

export default usePreventCodeStateRouter;
