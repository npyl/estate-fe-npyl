const SINGLE_PARAGRAPH = {
    type: "doc",
    content: [
        {
            type: "paragraph",
            content: [
                {
                    type: "text",
                    text: "This is a simple paragraph.",
                },
            ],
        },
    ],
};

const MULTIPLE_PARAGRAPHS = {
    type: "doc",
    content: [
        {
            type: "paragraph",
            content: [
                {
                    type: "text",
                    text: "First paragraph.",
                },
            ],
        },
        {
            type: "paragraph",
            content: [
                {
                    type: "text",
                    text: "Second paragraph.",
                },
            ],
        },
    ],
};

const HARD_BREAKS = {
    type: "doc",
    content: [
        {
            type: "paragraph",
            content: [
                {
                    type: "text",
                    text: "Line one",
                },
                {
                    type: "hardBreak",
                },
                {
                    type: "text",
                    text: "Line two",
                },
                {
                    type: "hardBreak",
                },
                {
                    type: "text",
                    text: "Line three",
                },
            ],
        },
    ],
};

const MIXED_NEWLINES = {
    type: "doc",
    content: [
        {
            type: "paragraph",
            content: [
                {
                    type: "text",
                    text: "First line",
                },
                {
                    type: "hardBreak",
                },
                {
                    type: "text",
                    text: "Second line",
                },
            ],
        },
        {
            type: "paragraph",
            content: [
                {
                    type: "text",
                    text: "New paragraph",
                },
            ],
        },
    ],
};

const EMPTY_DOCUMENT = {
    type: "doc",
    content: [
        {
            type: "paragraph",
            content: [],
        },
    ],
};

const WHITESPACE_AND_HARDBREAKS = {
    type: "doc",
    content: [
        {
            type: "paragraph",
            content: [
                {
                    type: "hardBreak",
                },
                {
                    type: "hardBreak",
                },
            ],
        },
    ],
};

// -------------------------------------------------------------------------------------

const TESTS = [
    {
        description: "single paragraph",
        input: "This is a simple paragraph.",
        expected: SINGLE_PARAGRAPH,
    },
    {
        description: "paragraphs separated by double newlines",
        input: "First paragraph.\n\nSecond paragraph.",
        expected: MULTIPLE_PARAGRAPHS,
    },
    {
        description:
            "should handle single newlines as hard breaks within a paragraph",
        input: "Line one\nLine two\nLine three",
        expected: HARD_BREAKS,
    },
    {
        description: "should handle mixed single and double newlines",
        input: "First line\nSecond line\n\nNew paragraph",
        expected: MIXED_NEWLINES,
    },
    {
        description: "should handle empty input",
        input: "",
        expected: EMPTY_DOCUMENT,
    },
    {
        description: "should handle input with only whitespace",
        input: "   \n   \n   ",
        expected: WHITESPACE_AND_HARDBREAKS,
    },
    {
        description: "should handle multiple consecutive double newlines",
        input: "First paragraph.\n\n\n\nSecond paragraph.",
        expected: MULTIPLE_PARAGRAPHS,
    },
];

// -------------------------------------------------------------------------------------

export { TESTS };
