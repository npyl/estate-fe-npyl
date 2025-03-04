import Stack from "@mui/material/Stack";
import { FC, PropsWithChildren, useRef } from "react";
import NavSection, { getSectionId } from "./NavSection";
import Sidebar, { SidebarRef } from "./Sidebar";
import useClosestSection from "./useClosestSection";
import useCookie from "@/hooks/useCookie";
import CookieNames from "@/constants/cookies";
import { PPQuickViewLayoutCookie } from "@/sections/Properties/ViewById/PanelWithQuickView/types";

// ----------------------------------------------------------------------------

import {
    AddressSection,
    AreaSection,
    BalconiesSection,
    BlueprintsSection,
    DetailsSection,
    DistanceSection,
    HeatingSection,
    ImageSection,
    NotesSection,
    ParkingsSection,
    SuitableFor,
    TechnicalFeatures,
    VideoSection,
} from "@/sections/Properties/ViewById/(sections)";
import ConstructionSection from "@/sections/Properties/ViewById/(sections)/ConstructionSection";
import Features from "@/sections/Properties/ViewById/(sections)/FeaturesSection";
import DescriptionSection from "@/sections/Properties/ViewById/(sections)/DescriptionSection";
import GoogleEarthSection from "@/sections/Properties/ViewById/(sections)/GoogleEarthSection";
import BasicSectionThreeCols from "../BasicSectionThreeCols";

const SECTIONS = {
    ImageSection,
    DetailsSection,
    ConstructionSection,
    TechnicalFeatures,
    Features,
    DescriptionSection,
    AddressSection,
    VideoSection,
    BasicSection: BasicSectionThreeCols,
    HeatingSection,
    AreaSection,
    DistanceSection,
    SuitableFor,
    BalconiesSection,
    ParkingsSection,
    NotesSection,
    BlueprintsSection,
    GoogleEarthSection,
};

const getSection = (sectionName: string) => {
    try {
        console.log("GOT: ", sectionName);
        const Section = SECTIONS[sectionName as keyof typeof SECTIONS] as any;
        const id = getSectionId(sectionName);

        return (
            <NavSection key={id} id={id}>
                <Section />
            </NavSection>
        );
    } catch (ex) {
        return null;
    }
};

const useFilteredChildren = () => {
    const [layout] = useCookie<PPQuickViewLayoutCookie>(cookieName, {
        sectionNames: [],
    });

    const { sectionNames } = layout;

    return {
        sectionNames,
        sections: sectionNames.map(getSection),
    };
};

// -----------------------------------------------------------------

const cookieName = CookieNames.QuickViewLayout;

interface LayoutProps extends PropsWithChildren {
    initial?: string;
}

const Layout: FC<LayoutProps> = ({ initial }) => {
    const sidebarRef = useRef<SidebarRef>(null);

    useClosestSection(sidebarRef);

    const { sectionNames, sections } = useFilteredChildren();

    return (
        <Stack direction={{ xs: "column", lg: "row-reverse" }} spacing={3}>
            {/* Sidebar */}
            <Sidebar
                ref={sidebarRef}
                initial={initial}
                width={{ xs: "100%", lg: "20%" }}
                names={sectionNames}
            />

            {/* Content */}
            <Stack width={1} overflow="hidden auto" spacing={1}>
                {sections}
            </Stack>
        </Stack>
    );
};

export default Layout;
