import Stack from "@mui/material/Stack";
import { FC, useRef } from "react";
import Buttons from "./Buttons";
import WithCalendar from "./_WithCalendar";
import MiscInfo from "./MiscInfo";
import dynamic from "next/dynamic";
import AssigneeSelect from "./Autocompletes/Assignee";
import RHFEditor from "@/components/hook-form/RHFEditor";
import Title from "./Title";
import PropertiesAutocomplete from "./Autocompletes/Properties";
import CustomerAutocomplete from "./Autocompletes/Customers";
import { Editor } from "@tiptap/react";
const Attachments = dynamic(() => import("./Attachments"));
const AssigneeHistory = dynamic(() => import("./AssigneeHistory"));
const Comments = dynamic(() => import("./Comments"));
const Labels = dynamic(() => import("./Labels"));

// -----------------------------------------------------------------

interface Reporter {
    firstName: string;
    lastName: string;
    avatar?: string;
}

interface UpdatedBy {
    firstName: string;
    lastName: string;
    avatar?: string;
}

interface ContentProps {
    cardId?: number;
    createdAt?: string;
    updatedAt?: string;
    reporter?: Reporter;

    updatedBy?: UpdatedBy;
}

const Content: FC<ContentProps> = ({
    cardId,
    createdAt,
    updatedAt,
    reporter,
    updatedBy,
}) => {
    const isEdit = Boolean(cardId);

    const editorRef = useRef<Editor>(null);

    return (
        <Stack spacing={2} mt={3}>
            {/* ------------------------ */}

            <Buttons />
            <Title editorRef={editorRef} />
            {/* ------------------------ */}

            <RHFEditor ref={editorRef} name="description" rows={5} />

            <Attachments cardId={cardId} />

            <PropertiesAutocomplete />
            <CustomerAutocomplete />
            <AssigneeSelect />

            <WithCalendar />

            <Labels cardId={cardId} />

            <Comments cardId={cardId} />

            {createdAt || updatedAt ? (
                <>
                    {isEdit ? (
                        <AssigneeHistory cardId={cardId!} reporter={reporter} />
                    ) : null}
                    <MiscInfo
                        createdAt={createdAt}
                        updatedAt={updatedAt}
                        reporter={reporter}
                        updatedBy={updatedBy}
                    />
                </>
            ) : null}
        </Stack>
    );
};

export default Content;
