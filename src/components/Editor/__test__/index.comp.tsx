import Editor, { EditorProps } from "@/components/Editor";
import { FC } from "react";

import "@/_private/JSON";

const Tester: FC<EditorProps> = (props) => <Editor {...props} />;

export default Tester;
