import type { MentionOptions } from "@tiptap/extension-mention";
import { ReactRenderer } from "@tiptap/react";
import SuggestionList, { type SuggestionListRef } from "./SuggestionList";

export type MentionSuggestion = {
    id: string;
    mentionLabel: string;
};

const suggestion: MentionOptions["suggestion"] = {
    items: async ({ query }): Promise<MentionSuggestion[]> => {
        const names = [
            "Lea Thompson",
            "Cyndi Lauper",
            "Tom Cruise",
            "Madonna",
            "Jerry Hall",
            "Joan Collins",
            "Winona Ryder",
            "Christina Applegate",
            "Alyssa Milano",
            "Molly Ringwald",
            "Ally Sheedy",
            "Debbie Harry",
            "Olivia Newton-John",
            "Elton John",
            "Michael J. Fox",
            "Axl Rose",
            "Emilio Estevez",
            "Ralph Macchio",
            "Rob Lowe",
            "Jennifer Grey",
            "Mickey Rourke",
            "John Cusack",
            "Matthew Broderick",
            "Justine Bateman",
            "Lisa Bonet",
            "Benicio Monserrate Rafael del Toro Sánchez",
        ];

        return names
            .map((name, index) => ({
                mentionLabel: name,
                id: index.toString(),
            }))
            .filter((item) =>
                item.mentionLabel.toLowerCase().startsWith(query.toLowerCase())
            )
            .slice(0, 5);
    },

    render: () => {
        let component: ReactRenderer<SuggestionListRef>;

        return {
            onStart: (props) => {
                // Create component
                component = new ReactRenderer(SuggestionList, {
                    props,
                    editor: props.editor,
                });

                // Append to DOM and setup popper
                document.body.appendChild(component.element);
            },

            onUpdate(props) {
                component?.updateProps(props);
                // TODO: not sure if this needs a popperRef.current?.update() call
            },

            onKeyDown(props) {
                if (props.event.key === "Escape") {
                    (component.element as HTMLElement).style.display = "none";
                    return true;
                }
                return component?.ref?.onKeyDown(props) || false;
            },

            onExit() {
                // Clean up
                component?.element?.remove();
                component?.destroy();
            },
        };
    },
};

export default suggestion;
