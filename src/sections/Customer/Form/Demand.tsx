import { IconButton, Tab, Tabs, Stack, Typography } from "@mui/material";
import { Suspense, useCallback, useState, lazy } from "react";
import { FC } from "react";
import { CloseIcon } from "yet-another-react-lightbox/core";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useFormContext } from "react-hook-form";
import { IDemandPOST } from "src/types/demand";
import { useTranslation } from "react-i18next";
import { SpaceBetween } from "@/components/styled";
import useResponsive from "@/hooks/useResponsive";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

// Dynamic
const DemandForm = lazy(() => import("./DemandSection/Form"));

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

    const { watch, setValue } = useFormContext();

    const demands = watch(demandsName) as IDemandPOST[];

    const [index, setIndex] = useState(0);

    const handleTabCreate = useCallback(
        () => setValue(demandsName, [...demands, emptyDemand]),
        [demands]
    );
    const handleTabChange = useCallback((e: any, v: number) => setIndex(v), []);
    const handleDeleteTab = useCallback(
        (i: number) =>
            setValue(
                demandsName,
                demands.filter((d, index) => index !== i)
            ),
        [demands]
    );

    const isMobile = useResponsive("down", "lg");

    return (
        <>
            <SpaceBetween alignItems="center">
                <Typography variant="h6">{t("Demands")}</Typography>

                <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton onClick={handleTabCreate}>
                        <AddCircleOutlineOutlinedIcon />
                    </IconButton>

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
                                <CloseIcon onClick={() => handleDeleteTab(i)} />
                            }
                        />
                    ))}
                </Tabs>
            </Stack>

            {demands.length > index ? ( // prevent loading DemandForm too fast
                <Suspense fallback={null}>
                    <DemandForm index={index} />
                </Suspense>
            ) : null}
        </>
    );
};
export default DemandSection;
