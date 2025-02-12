import { RefObject } from "react";
import DemandTab from "./DemandTab";
import { TabsRef } from "../types";

type TTabOption = Record<"id", string>;

const getTab =
    (tabsRef: RefObject<TabsRef>) =>
    ({ id }: TTabOption, index: number) =>
        <DemandTab key={id} index={index} value={index} tabsRef={tabsRef} />;

export default getTab;
