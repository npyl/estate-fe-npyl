import { useRef, useState } from “react”;
import { StyledEditorToolbar } from “./styles”;
import { Quill } from “react-quill”;
// import Picker from “@emoji-mart/react”;
// import styled from “styled-components”;
const HEADINGS = [
  “Heading 1",
  “Heading 2”,
  “Heading 3",
  “Heading 4”,
  “Heading 5",
  “Heading 6”,
];
// Add fonts to whitelist and register them
const Font = Quill.import(“formats/font”);
Font.whitelist = [
  “arial”,
  “comic-sans”,
  “courier-new”,
  “georgia”,
  “helvetica”,
  “lucida”,
];
Quill.register(Font, true);
// Modules object for setting up the Quill editor
// export const modules = {
//   toolbar: {
//     container: “#toolbar”,
//     handlers: {
//       undo: undoChange,
//       redo: redoChange,
//     },
//   },
//   history: {
//     delay: 500,
//     maxStack: 100,
//     userOnly: true,
//   },
// };
// export const formats = [
//   “align”,
//   “background”,
//   “blockquote”,
//   “bold”,
//   “bullet”,
//   “code”,
//   “code-block”,
//   “color”,
//   “direction”,
//   “font”,
//   “formula”,
//   “header”,
//   “image”,
//   “indent”,
//   “italic”,
//   “link”,
//   “list”,
//   “script”,
//   “size”,
//   “strike”,
//   “table”,
//   “underline”,
//   “emoji”,
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
        <span className=“ql-formats”>
          <select className=“ql-font” defaultValue=“arial”>
            <option value=“arial”>Arial</option>
            <option value=“comic-sans”>Comic Sans</option>
            <option value=“courier-new”>Courier New</option>
            <option value=“georgia”>Georgia</option>
            <option value=“helvetica”>Helvetica</option>
            <option value=“lucida”>Lucida</option>
          </select>
          <select className=“ql-size” defaultValue=“medium”>
            <option value=“extra-small”>Size 1</option>
            <option value=“small”>Size 2</option>
            <option value=“medium”>Size 3</option>
            <option value=“large”>Size 4</option>
          </select>
          <select className=“ql-header” defaultValue=“3”>
            <option value=“1">Heading</option>
            <option value=“2”>Subheading</option>
            <option value=“3">Normal</option>
          </select>
        </span>
        <span className=“ql-formats”>
          <button className=“ql-bold” />
          <button className=“ql-italic” />
          <button className=“ql-underline” />
          <button className=“ql-strike” />
        </span>
        <span className=“ql-formats”>
          <button className=“ql-list” value=“ordered” />
          <button className=“ql-list” value=“bullet” />
          <button className=“ql-indent” value=“-1" />
          <button className=“ql-indent” value=“+1" />
        </span>
        <span className=“ql-formats”>
          <button className=“ql-script” value=“super” />
          <button className=“ql-script” value=“sub” />
          <button className=“ql-blockquote” />
          <button className=“ql-direction” />
        </span>
        <span className=“ql-formats”>
          <select className=“ql-align” />
          <select className=“ql-color” />
          <select className=“ql-background” />
        </span>
        <span className=“ql-formats”>
          <button className=“ql-link” />
          <button className=“ql-image” />
          <button className=“ql-video” />
        </span>
        <span className=“ql-formats”>
          <button className=“ql-formula” />
          <button className=“ql-code-block” />
          <button className=“ql-clean” />
        </span>
        {/* <span className=“ql-formats”>
          <button className=“ql-undo”>
            <CustomUndo />
          </button>
          <button className=“ql-redo”>
            <CustomRedo />
          </button>
        </span> */}
        {/* <div className=‘ql-formats’>
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