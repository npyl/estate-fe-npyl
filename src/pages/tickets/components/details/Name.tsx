import { useCallback, useEffect, useRef, useState } from "react";
// types
import { IKanbanCardPOST } from "src/types/kanban";
// kanban
import KanbanInputName from "../KanbanInputName";

interface NameProps {
    taskName: string;
    onUpdate: (card: Partial<IKanbanCardPOST>) => void;
}

const Name = ({ taskName, onUpdate }: NameProps) => {
    const [name, setName] = useState("");

    const renameRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setName(taskName);
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
        <KanbanInputName
            inputRef={renameRef}
            placeholder="Task name"
            value={name}
            onChange={handleChange}
            onKeyUp={handleUpdate}
        />
    );
};

export default Name;
