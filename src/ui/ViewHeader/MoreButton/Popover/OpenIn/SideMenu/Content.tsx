import { IListing } from "@/types/listings";
import Link from "@/components/Link";
import { useRouter } from "next/router";
import { FC } from "react";
import { useTranslation } from "react-i18next";

// ---------------------------------------------------------------------------------

interface PublicOptionProps {
    lang: string;
    l: IListing;
    propertyId: string;
}

const PublicOption: FC<PublicOptionProps> = ({ lang, l, propertyId }) => {
    const {
        publicSite: { siteUrl },
        published,
    } = l;

    if (!published) return null;

    const href = `${siteUrl}/${lang}/property-detail/${propertyId}`;

    return (
        <Link href={href} target="_blank">
            {siteUrl}
        </Link>
    );
};

const getPublicOption = (lang: string, propertyId: string) => (l: IListing) => (
    <PublicOption
        key={l.publicSite.id}
        lang={lang}
        l={l}
        propertyId={propertyId}
    />
);

// ---------------------------------------------------------------------------------

interface ContentProps {
    publicListings: IListing[];
}

const Content: FC<ContentProps> = ({ publicListings }) => {
    const { i18n } = useTranslation();

    const lang = i18n.language === "en" ? "en" : "gr";

    const router = useRouter();
    const { propertyId } = router.query;

    return publicListings.map(getPublicOption(lang, propertyId as string));
};

export type { ContentProps };
export default Content;
