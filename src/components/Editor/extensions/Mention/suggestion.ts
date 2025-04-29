import type { MentionOptions } from "@tiptap/extension-mention";
import { ReactRenderer } from "@tiptap/react";
import { createPopper, Instance as PopperInstance } from "@popperjs/core";
import SuggestionList, { type SuggestionListRef } from "./SuggestionList";

export type MentionSuggestion = {
    id: string;
    mentionLabel: string;
};

// Default DOMRect for positioning fallback
const DOM_RECT_FALLBACK: DOMRect = {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
    toJSON() {
        return {};
    },
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
        let popperInstance: PopperInstance;
        let virtualReference: { getBoundingClientRect: () => DOMRect };

        return {
            onStart: (props) => {
                // Create component
                component = new ReactRenderer(SuggestionList, {
                    props,
                    editor: props.editor,
                });

                // Create virtual reference for positioning
                virtualReference = {
                    getBoundingClientRect: () =>
                        props.clientRect?.() ?? DOM_RECT_FALLBACK,
                };

                // Append to DOM and setup popper
                document.body.appendChild(component.element);

                popperInstance = createPopper(
                    virtualReference,
                    component.element as HTMLElement,
                    {
                        placement: "bottom-start",
                        modifiers: [
                            { name: "offset", options: { offset: [0, 8] } },
                            {
                                name: "preventOverflow",
                                options: { padding: 8 },
                            },
                        ],
                    }
                );
            },

            onUpdate(props) {
                // Update props and position
                component?.updateProps(props);
                virtualReference.getBoundingClientRect = () =>
                    props.clientRect?.() ?? DOM_RECT_FALLBACK;
                popperInstance?.update();
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
                popperInstance?.destroy();
                component?.element?.remove();
                component?.destroy();
            },
        };
    },
};

export default suggestion;
