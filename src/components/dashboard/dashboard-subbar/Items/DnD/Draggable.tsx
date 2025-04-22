import { FC } from "react";
import dynamic from "next/dynamic";
import { Draggable } from "@hello-pangea/dnd";
import { ITab } from "@/types/tabs";
const TabItem = dynamic(() => import("../Item"));

interface DraggableTabProps {
    t: ITab;
    index: number;
}

const DraggableTab: FC<DraggableTabProps> = ({ t, index }) => (
    <Draggable key={t.path} draggableId={t.path} index={index}>
        {(provided, snapshot) => (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                    ...provided.draggableProps.style,
                    opacity: snapshot.isDragging ? 0.8 : 1,
                    cursor: "grab",
                }}
            >
                <TabItem t={t} />
            </div>
        )}
    </Draggable>
);

// -------------------------------------------------------------------------------

const getTab = (t: ITab, index: number) => <DraggableTab t={t} index={index} />;

// -------------------------------------------------------------------------------

export default getTab;
