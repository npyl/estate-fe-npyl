import { useRef, useState } from "react";
import { StyledEditorToolbar } from "./styles";
import { Quill } from "react-quill";

// import Picker from "@emoji-mart/react";

// import styled from "styled-components";

const HEADINGS = [
  "Heading 1",
  "Heading 2",
  "Heading 3",
  "Heading 4",
  "Heading 5",
  "Heading 6",
];

const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
);

// Redo button icon component for Quill editor
const CustomRedo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path
      className="ql-stroke"
      d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
    />
  </svg>
);

// Undo and redo functions for Custom Toolbar
function undoChange(this: { quill: any; undo: () => void; redo: () => void }) {
  this.quill.history.undo();
}
function redoChange(this: { quill: any; undo: () => void; redo: () => void }) {
  this.quill.history.redo();
}

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida",
];
Quill.register(Font, true);

// Modules object for setting up the Quill editor
export const modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      undo: undoChange,
      redo: redoChange,
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
};

// Formats objects for setting up the Quill editor
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block",
];

// export const formats = [
//   "align",
//   "background",
//   "blockquote",
//   "bold",
//   "bullet",
//   "code",
//   "code-block",
//   "color",
//   "direction",
//   "font",
//   "formula",
//   "header",
//   "image",
//   "indent",
//   "italic",
//   "link",
//   "list",
//   "script",
//   "size",
//   "strike",
//   "table",
//   "underline",
//   "emoji",
// ];
type EditorToolbarProps = {
  id: string;
  isSimple?: boolean;
};
export default function EditorToolbar({
  id,
  isSimple,
  ...other
}: EditorToolbarProps) {
  const [emoji, setEmoji] = useState(false);
  const editorRef = useRef(null);
  // const handleEmojiSelect = (selectedEmoji) => {
  //   if (editorRef.current) {
  //     const selection = window.getSelection();
  //     if (!selection) return null;
  //     const range = selection.getRangeAt(0);
  //     const textNode = document.createTextNode(selectedEmoji.native);
  //     range.insertNode(textNode);
  //     if (!textNode) return null;
  //     range.setStartAfter(textNode);
  //     range.setEndAfter(textNode);
  //     selection.removeAllRanges();
  //     selection.addRange(range);
  //   }
  // };
  return (
    <StyledEditorToolbar ref={editorRef} {...other}>
      <div id={id}>
        <select className="ql-font" defaultValue="arial">
          <option value="arial">Arial</option>
          <option value="comic-sans">Comic Sans</option>
          <option value="courier-new">Courier New</option>
          <option value="georgia">Georgia</option>
          <option value="helvetica">Helvetica</option>
          <option value="lucida">Lucida</option>
        </select>
        <select className="ql-size" defaultValue="medium">
          <option value="small">Size 1</option>
          <option value="medium">Size 2</option>
          <option value="large">Size 3</option>
        </select>
        <div className="ql-formats">
          <select className="ql-header" defaultValue="">
            {HEADINGS.map((heading, index) => (
              <option key={heading} value={index + 1}>
                {heading}
              </option>
            ))}
            <option value="">Normal</option>
          </select>
        </div>

        <div className="ql-formats">
          <button type="button" className="ql-bold" />
          <button type="button" className="ql-italic" />
          <button type="button" className="ql-underline" />
          <button type="button" className="ql-strike" />
        </div>

        {!isSimple && (
          <div className="ql-formats">
            <select className="ql-color" />
            <select className="ql-background" />
          </div>
        )}

        <div className="ql-formats">
          <button type="button" className="ql-list" value="ordered" />
          <button type="button" className="ql-list" value="bullet" />
          {!isSimple && (
            <button type="button" className="ql-indent" value="-1" />
          )}
          {!isSimple && (
            <button type="button" className="ql-indent" value="+1" />
          )}
        </div>

        {!isSimple && (
          <div className="ql-formats">
            <button type="button" className="ql-code-block" />
            <button type="button" className="ql-blockquote" />
          </div>
        )}

        <div className="ql-formats">
          <button type="button" className="ql-direction" value="rtl" />
          <select className="ql-align" />
        </div>

        <div className="ql-formats">
          <button type="button" className="ql-link" />
          <button type="button" className="ql-image" />
          <button type="button" className="ql-video" />
        </div>
        <span className="ql-formats">
          <button className="ql-undo">
            <CustomUndo />
          </button>
          <button className="ql-redo">
            <CustomRedo />
          </button>
        </span>

        {/* <div className='ql-formats'>
          <button
            type=‘button’
            className=‘ql-emoji’
            onClick={() => setEmoji((emoji) => !emoji)}
          >
            :grinning:
          </button>
          {emoji && <Picker onEmojiSelect={handleEmojiSelect} />}
        </div> */}
      </div>
    </StyledEditorToolbar>
  );
}
