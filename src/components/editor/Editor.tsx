import "../../utils/highlight";
// next
import dynamic from "next/dynamic";
// @mui
import { Box } from "@mui/material";
//
import { StyledEditor } from "./styles";
import { EditorProps } from "./types";
import { useTranslation } from "react-i18next";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <Box
      sx={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: "absolute",
        bgcolor: "background.paper",
      }}
    >
      Loading...
    </Box>
  ),
});

const EditorToolbar = dynamic(() => import("./EditorToolbar"), {
  ssr: false,
});

export const formats = [
  "align",
  "background",
  "blockquote",
  "bold",
  "bullet",
  "code",
  "code-block",
  "color",
  "direction",
  "font",
  "formula",
  "header",
  "image",
  "indent",
  "italic",
  "link",
  "list",
  "script",
  "size",
  "strike",
  "table",
  "underline",
  "emoji",
];

// ----------------------------------------------------------------------

export default function Editor({
  id = "minimal-quill",
  error,
  value,
  onChange,
  simple = false,
  helperText,
  sx,
  ...other
}: EditorProps) {
  const modules = {
    toolbar: {
      container: `#${id}`,
    },
    history: {
      delay: 500,
      maxStack: 300,
      userOnly: true,
    },
    syntax: true,
    clipboard: {
      matchVisual: false,
    },
  };
  const { t } = useTranslation();
  return (
    <>
      <StyledEditor
        sx={{
          ...(error && {
            border: (theme) => `solid 1px ${theme.palette.error.main}`,
          }),
          ...sx,
        }}
      >
        <EditorToolbar id={id} isSimple={simple} />

        <ReactQuill
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={t("Write your Description")}
          {...other}
        />
      </StyledEditor>

      {helperText && helperText}
    </>
  );
}
