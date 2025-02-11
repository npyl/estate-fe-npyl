import DemandTab from "./DemandTab";

type TTabOption = Record<"id", string>;

const getTab =
    (onBeforeRemove: (index: number) => void) =>
    ({ id }: TTabOption, i: number) =>
        (
            <DemandTab
                key={id}
                index={i}
                value={i}
                onBeforeRemove={onBeforeRemove}
            />
        );

export default getTab;
