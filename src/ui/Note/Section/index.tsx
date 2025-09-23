import { FC } from "react";
import NoteCreate, { NoteCreateProps } from "./Create";

interface NoteSectionProps extends NoteCreateProps {}

const NoteSection: FC<NoteSectionProps> = (props) => {
    return <NoteCreate {...props} />;
};

export type { NoteSectionProps };
export default NoteSection;
