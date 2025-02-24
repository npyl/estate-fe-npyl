import DemandTab from "./DemandTab";

type TTabOption = Record<"id", string>;

const getTab =
    (removeTab: (removeIndex: number) => void) =>
    ({ id }: TTabOption, index: number) =>
        (
            <DemandTab
                key={id}
                index={index}
                value={index}
                removeTab={removeTab}
            />
        );

export default getTab;
