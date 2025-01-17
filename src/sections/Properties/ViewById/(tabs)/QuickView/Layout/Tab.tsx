import { ReactNode } from "react";
import Tab from "@mui/material/Tab";
import isNamedComponent from "./isNamedComponent";

const SECTION_LABELS: Record<string, string> = {
    ImageSection: "Images",
    BlueprintsSection: "Blueprints",
    DetailsSection: "Details",
    ConstructionSection: "Construction",
    TechnicalFeatures: "Technical Features",
    Features: "Features",
    DescriptionSection: "Description",
    AddressSection: "Address",
    VideoSection: "Video",
    BasicSection: "Basic",
    HeatingSection: "Heating",
    AreaSection: "Area",
    DistanceSection: "Distance",
    SuitableFor: "Suitable For",
    BalconiesSection: "Balconies",
    ParkingsSection: "Parkings",
    NotesSection: "Notes",
};

const getTabId = (name: string) => `Tab-${name}`;

const getTab = (content: ReactNode) => {
    if (!isNamedComponent(content))
        throw new Error("Invalid section component");

    const name = content.type.name;
    const id = getTabId(name);

    const label = SECTION_LABELS[name];

    return <Tab key={name} id={id} label={label} value={name} />;
};

export { getTabId };
export default getTab;
