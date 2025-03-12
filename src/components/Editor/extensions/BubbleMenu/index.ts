import { Plugin, PluginKey } from "@tiptap/pm/state";
import BubbleMenuView from "./View";
import { BubbleMenuPluginProps } from "./types";

const BubbleMenuPlugin = (options: BubbleMenuPluginProps) => {
    return new Plugin({
        key:
            typeof options.pluginKey === "string"
                ? new PluginKey(options.pluginKey)
                : options.pluginKey,
        view: (view) => new BubbleMenuView({ view, ...options }),
    });
};

export type { BubbleMenuPluginProps };
export default BubbleMenuPlugin;
