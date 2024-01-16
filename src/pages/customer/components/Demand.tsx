import { IconButton, Tab, Tabs, Stack } from "@mui/material";
import { useCallback, useState } from "react";
import { FC } from "react";
import DemandForm from "./DemandSection/Form";
import { CloseIcon } from "yet-another-react-lightbox/core";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Panel from "src/components/Panel";
import { useFormContext } from "react-hook-form";
import { IDemandPOST } from "src/types/demand";

const emptyDemand: IDemandPOST = {
    filters: {
        labels: [],
        regions: [],
        cities: [],
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

const leaserName = "leaser";
const buyerName = "buyer";
const demandsName = "demands";

const DemandSection: FC = () => {
    const { watch, setValue } = useFormContext();

    const leaser = watch(leaserName);
    const buyer = watch(buyerName);
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

    // show DemandSection only if leaser or buyer
    if (!leaser && !buyer) return null;

    return (
        <Panel
            label="Demand Forms"
            endNode={
                <IconButton onClick={handleTabCreate}>
                    <AddCircleOutlineOutlinedIcon />
                </IconButton>
            }
        >
            <Stack
                sx={{ px: 2, borderBottom: 1, borderColor: "divider" }}
                direction={"row"}
            >
                <Tabs value={index} onChange={handleTabChange}>
                    {demands.map((d, i) => (
                        <Tab
                            key={i}
                            label={`Demand ${i + 1}`}
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
                <DemandForm index={index} />
            ) : null}
        </Panel>
    );
};
export default DemandSection;
