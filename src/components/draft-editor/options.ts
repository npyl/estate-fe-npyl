// TODO: types for this??
const toolbarOptions = {
    options: [
        "inline",
        "blockType",
        "list",
        "textAlign",
        "link",
        "emoji",
        "image",
        "remove",
        "history",
    ],
    blockType: {
        inDropdown: true,
        options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6", "Blockquote"],
    },
    list: {
        // list options without indent/outdent
        options: ["unordered", "ordered"],
    },
};

export default toolbarOptions;
