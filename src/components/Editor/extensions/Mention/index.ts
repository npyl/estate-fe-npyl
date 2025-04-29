import Mention from "@tiptap/extension-mention";
import suggestion from "./suggestion";
import { CLASSNAMES } from "../../constants";

export default Mention.configure({
    HTMLAttributes: {
        class: CLASSNAMES.Mention,
    },
    suggestion,
});
