import AgreementCard from "@/sections/agreements/AgreementCard";
import Pagination from "@/components/Pagination/client";
import { useSearchAgreementsQuery } from "@/services/agreements";
import React, { useMemo, useRef } from "react";
import { usePagination } from "@/components/Pagination";
import { useTranslation } from "react-i18next";
import AgreementIcon from "@/assets/icons/agreement";
import Head from "./Head";

const PAGE_SIZE = 5;

interface Props {
    search: string;
}

const Content: React.FC<Props> = ({ search }) => {
    const pagination = usePagination();

    const { data, isLoading } = useSearchAgreementsQuery({
        search,
        page: pagination.page,
        pageSize: PAGE_SIZE,
    });

    const agreements = useMemo(
        () => (Array.isArray(data?.content) ? data.content : []),
        [data?.content]
    );

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
            isLoading={isLoading}
            pageSize={PAGE_SIZE}
            onChange={handlePageChange}
        >
            {agreements.map((a) => (
                <AgreementCard key={a.id} a={a} />
            ))}
        </Pagination>
    );
};

const Header = () => {
    const { t } = useTranslation();
    return (
        <Head>
            <AgreementIcon />
            {t("Agreements")}
        </Head>
    );
};

const AgreementItems: React.FC<Props> = (props) => (
    <>
        <Header />
        <Content {...props} />
    </>
);

export default AgreementItems;
