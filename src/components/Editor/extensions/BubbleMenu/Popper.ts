import { Editor } from "@tiptap/core";
import { createPopper, Instance, Options } from "@popperjs/core";

class PopperHandler {
    private popper: Instance | undefined;
    private element: HTMLElement;
    private editor: Editor;
    private virtualReference: any;
    private popperOptions?: Partial<Options>;

    constructor(
        editor: Editor,
        element: HTMLElement,
        popperOptions?: Partial<Options>
    ) {
        this.element = element;
        this.editor = editor;
        this.popperOptions = popperOptions;

        // Initialize virtual reference for Popper.js
        this.virtualReference = {
            getBoundingClientRect: () => ({
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                width: 0,
                height: 0,
            }),
            contextElement: this.editor.options.element,
        };
    }

    /**
     * Creates and initializes the Popper instance
     */
    create() {
        const { element: editorElement } = this.editor.options;
        const editorIsAttached = !!editorElement.parentElement;

        if (this.popper || !editorIsAttached) {
            return;
        }

        // Append the element to the editor element
        editorElement.appendChild(this.element);

        // Create the Popper instance
        this.popper = createPopper(this.virtualReference, this.element, {
            placement: "top",
            modifiers: [
                {
                    name: "offset",
                    options: {
                        offset: [0, 10],
                    },
                },
                {
                    name: "eventListeners",
                    options: {
                        scroll: true,
                        resize: true,
                    },
                },
                {
                    name: "preventOverflow",
                    options: {
                        boundary: editorElement,
                        padding: 8,
                    },
                },
                ...((this.popperOptions?.modifiers || []) as any),
            ],
            ...this.popperOptions,
        });
    }

    /**
     * Updates the position reference and repositions the popper
     */
    updatePosition(getReferenceRect: () => DOMRect) {
        this.virtualReference.getBoundingClientRect = getReferenceRect;
        this.popper?.update();
    }

    /**
     * Destroys the Popper instance
     */
    destroy() {
        this.popper?.destroy();
    }

    /**
     * Checks if popper has been initialized
     */
    isInitialized(): boolean {
        return !!this.popper;
    }
}

export default PopperHandler;
