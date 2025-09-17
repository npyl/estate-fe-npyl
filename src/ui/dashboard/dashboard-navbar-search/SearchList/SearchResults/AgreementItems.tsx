import AgreementCard from "@/sections/agreements/AgreementCard";
import { useSearchAgreementsQuery } from "@/services/agreements";
import { FC, useEffect, useMemo, useRef } from "react";
import Pagination, { usePagination } from "@/components/Pagination";
import { useTranslation } from "react-i18next";
import AgreementIcon from "@/assets/icons/agreement";
import Head, { useHeadControl } from "./Head";

const PAGE_SIZE = 5;

interface Props {
    search: string;
}

interface ContentProps extends Props {
    onCountChange: (c: number) => void;
}

const Content: FC<ContentProps> = ({ search, onCountChange }) => {
    const pagination = usePagination();

    const { data, isLoading } = useSearchAgreementsQuery({
        search,
        page: pagination.page,
        pageSize: PAGE_SIZE,
    });

    const totalItems = data?.totalElements ?? 0;
    const agreements = useMemo(
        () => (Array.isArray(data?.content) ? data.content : []),
        [data?.content]
    );
    useEffect(() => {
        onCountChange(totalItems);
    }, [totalItems, onCountChange]);

    const handlePageChange = (event: any, page: number) => {
        event.stopPropagation();
        pagination.onChange(event, page);

        if (!scrollRef.current) return;
        scrollRef.current.scrollTop = 0;
    };

    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <Pagination
            {...pagination}
            totalItems={totalItems}
            isLoading={isLoading}
            pageSize={PAGE_SIZE}
            onChange={handlePageChange}
            ContainerProps={{
                p: 1,
                px: 2,
            }}
        >
            {agreements.map((a) => (
                <AgreementCard key={a.id} a={a} />
            ))}
        </Pagination>
    );
};

const AgreementItems: FC<Props> = (props) => {
    const { t } = useTranslation();

    const { headRef, onCountChange } = useHeadControl();

    return (
        <>
            <Head ref={headRef} Icon={AgreementIcon}>
                {t("Agreements")}
            </Head>

            <Content {...props} onCountChange={onCountChange} />
        </>
    );
};

export default AgreementItems;
