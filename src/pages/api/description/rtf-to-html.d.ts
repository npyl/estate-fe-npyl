// types.d.ts

declare module "@iarna/rtf-to-html" {
  interface Options {
    font?: {
      name?: string;
      family?: "serif" | "sans-serif" | "cursive" | "fantasy" | "monospace";
    };
    fontSize?: number;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    foreground?: {
      red: number;
      green: number;
      blue: number;
    };
    background?: {
      red: number;
      green: number;
      blue: number;
    };
    firstLineIndent?: number;
    indent?: number;
    align?: "left" | "right" | "center" | "justify";
    valign?: "normal" | "super" | "sub";
    paraBreaks?: string;
    paraTag?: string;
    template?: (doc: Document, defaults: Options, content: string) => string;
    disableFonts?: boolean;
  }

  interface Document {
    content: Array<{ value: string; style: Options }>;
    style: Options;
    marginLeft: number;
    marginRight: number;
    marginTop: number;
    marginBottom: number;
  }

  type FromStringCallback = (error: Error | null, html?: string) => void;

  /**
   * Converts an RTF string to HTML.
   *
   * @param rtfString The RTF string to convert.
   * @param options Conversion options to customize the output.
   * @param callback The callback function to handle the result or error.
   */
  export function fromString(
    rtfString: string,
    options: Options | null,
    callback: FromStringCallback
  ): void;
}
