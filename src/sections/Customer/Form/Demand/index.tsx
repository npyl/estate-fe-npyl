import {
    IconButton,
    Tab,
    Tabs,
    Stack,
    Typography,
    Button,
} from "@mui/material";
import { useCallback, useState } from "react";
import { FC } from "react";
import { CloseIcon } from "yet-another-react-lightbox/core";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useFormContext, useWatch } from "react-hook-form";
import { IDemandPOST } from "src/types/demand";
import { useTranslation } from "react-i18next";
import { SpaceBetween } from "@/components/styled";
import useResponsive from "@/hooks/useResponsive";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import dynamic from "next/dynamic";
const DemandForm = dynamic(() => import("./Form"));

const emptyDemand: IDemandPOST = {
    filters: {
        labels: [],
        regions: [],
        cities: [],
        complexes: [],
        categories: [],
        parentCategories: [],
        furnished: [],

        minPlot: 0,
        maxPlot: 0,
        minPrice: 0,
        maxPrice: 0,
        minBathrooms: 0,
        maxBathrooms: 0,
        minCovered: 0,
        maxCovered: 0,
        minBedrooms: 0,
        maxBedrooms: 0,
        minYearOfConstruction: 0,
        maxYearOfConstruction: 0,
        minFloor: "",
        maxFloor: "",
    },
    priorityFeatures: {
        panoramicView: false,
        seaView: false,
        mountainView: false,
        seaFront: false,
        walkableDistanceToBeach: false,
        quietArea: false,
        bright: false,
        nearBusRoute: false,
        smartHome: false,
        guestroom: false,
        office: false,
        homeCinema: false,
        combinedKitchenAndDiningArea: false,
        soundInsulation: false,
        thermalInsulation: false,
        heatedPool: false,
        indoorPool: false,
        organizedGarden: false,
        jacuzzi: false,
        well: false,
        drilling: false,
        masonryFence: false,
        accessForDisabled: false,
        alarmSystem: false,
        has24HoursSecurity: false,
        cctv: false,
        internet: false,
        fireDetector: false,
        independentHeatingPerRoom: false,
        adaptingToTheGround: false,
        barbeque: false,
        pool: false,
        view: false,
        facade: false,
        corner: false,
        veranda: false,
        tents: false,
        withinResidentialZone: false,
        withinCityPlan: false,
        loadingDock: false,
    },
    shapes: [],
};

const demandsName = "demands";

interface Props {
    onClose: VoidFunction;
}

const DemandSection: FC<Props> = ({ onClose }) => {
    const { t } = useTranslation();

    const { setValue } = useFormContext();

    const demands = useWatch({ name: demandsName }) as IDemandPOST[];

    const [index, setIndex] = useState(0);

    const handleTabCreate = useCallback(
        () => setValue(demandsName, [...demands, emptyDemand]),
        [demands]
    );
    const handleTabChange = useCallback((e: any, v: number) => setIndex(v), []);
    const handleDeleteTab = useCallback(
        (i: number) => {
            setIndex((old) => Math.max(0, old - 1));

            // remove tab
            const filtered = demands.filter((d, index) => index !== i);
            setValue(demandsName, filtered);
        },
        [demands]
    );

    const isMobile = useResponsive("down", "lg");

    return (
        <>
            <SpaceBetween alignItems="center">
                <Typography variant="h6">{t("Demands")}</Typography>

                <Stack direction="row" spacing={1} alignItems="center">
                    <Button
                        startIcon={<AddCircleOutlineOutlinedIcon />}
                        onClick={handleTabCreate}
                    >
                        {t("Add")}
                    </Button>

                    {isMobile ? (
                        <IconButton onClick={onClose}>
                            <CloseOutlinedIcon />
                        </IconButton>
                    ) : null}
                </Stack>
            </SpaceBetween>

            <Stack borderBottom={1} borderColor="divider" direction="row">
                <Tabs value={index} onChange={handleTabChange}>
                    {demands.map((d, i) => (
                        <Tab
                            key={i}
                            label={`${t("Demand")} ${i + 1}`}
                            sx={{
                                display: "flex",
                                flexDirection: "row-reverse",
                                alignItems: "center",
                                gap: 2,
                            }}
                            icon={
                                <IconButton
                                    size="small"
                                    onClick={() => handleDeleteTab(i)}
                                    sx={{
                                        borderRadius: "100%",
                                    }}
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            }
                        />
                    ))}
                </Tabs>
            </Stack>

            {demands.length > index ? ( // prevent loading DemandForm too fast
                <DemandForm index={index} />
            ) : null}
        </>
    );
};
export default DemandSection;
