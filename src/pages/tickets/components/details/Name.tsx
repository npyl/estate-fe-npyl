import { useCallback, useEffect, useRef, useState } from "react";
// types
import { IKanbanCardPOST } from "src/types/kanban";
// kanban
import KanbanInputName from "../KanbanInputName";
import { EnterOverlay } from "../EnterOverlay";

interface NameProps {
    taskName: string;
    onUpdate: (card: Partial<IKanbanCardPOST>) => void;
}

const Name = ({ taskName, onUpdate }: NameProps) => {
    const [initialState, setInitialState] = useState("");
    const [name, setName] = useState("");

    const renameRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setName(taskName);
        setInitialState(taskName);
    }, [taskName]);

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) =>
            setName(event.target.value),
        []
    );

    const handleUpdate = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter" && renameRef.current) {
                renameRef.current.blur();

                onUpdate({ name });
            }
        },
        [name]
    );

    return (
        <EnterOverlay show={name !== initialState}>
            <KanbanInputName
                inputRef={renameRef}
                placeholder="Task name"
                value={name}
                onChange={handleChange}
                onKeyUp={handleUpdate}
            />
        </EnterOverlay>
    );
};

export default Name;
