import { $generateHtmlFromNodes } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { countBy } from "lodash";
import { forwardRef, useImperativeHandle } from "react";

type CopyPluginMethods = {
  getHTML(cb: (html: string) => void): void;
};

const CopyPlugin = forwardRef<CopyPluginMethods, unknown>((_, ref) => {
  const [editor] = useLexicalComposerContext();

  const getHTML = (cb: (html: string) => void) => {
    editor.getEditorState().read(() => {
      const html = $generateHtmlFromNodes(editor, null);
      cb(html);
    });
  };

  useImperativeHandle(ref, () => ({
    getHTML: getHTML,
  }));

  return null;
});

CopyPlugin.displayName = "CopyPlugin";

export default CopyPlugin;
