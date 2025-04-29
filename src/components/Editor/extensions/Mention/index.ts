import Mention from "@tiptap/extension-mention";
import suggestion from "./suggestion";

export default Mention.configure({
    suggestion,
});
