import type { MentionOptions } from "@tiptap/extension-mention";
import { ReactRenderer } from "@tiptap/react";
import SuggestionList, { SuggestionListProps } from "./SuggestionList";

const clean = (component: ReactRenderer<unknown, SuggestionListProps>) => {
    component?.element?.remove();
    component?.destroy();
};

const suggestion: MentionOptions["suggestion"] = {
    render: () => {
        let component: ReactRenderer<unknown, SuggestionListProps>;

        const onClose = () => clean(component);

        return {
            onStart: (_props) => {
                const props = { ..._props, onClose };

                component = new ReactRenderer(SuggestionList, {
                    props,
                    editor: props.editor,
                });
            },

            onUpdate(props) {
                component?.updateProps(props);
            },

            onExit() {
                clean(component);
            },
        };
    },
};

export default suggestion;
