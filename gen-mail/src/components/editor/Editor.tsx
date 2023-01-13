import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  ElementRef,
} from "react";
import { useColorMode } from "@chakra-ui/react";
import ExampleTheme from "./themes/ExampleTheme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";

import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import StyledEditor from "./StyleEditor";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import { $generateHtmlFromNodes } from "@lexical/html";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { useTranslation } from "react-i18next";

function Placeholder() {
  const { t, i18n } = useTranslation();
  return <div className="editor-placeholder">{t("editor.placeHolder")}</div>;
}

type EditorMethods = {
  getHTML(): Promise<string>;
};

const Editor = forwardRef<EditorMethods>((_, ref) => {
  const { colorMode } = useColorMode();
  const editorConfig = {
    theme: ExampleTheme,
    namespace: "Playground",
    onError: (error: Error) => {
      throw error;
    },
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
    ],
  };

  const copyPluginRef = useRef<ElementRef<typeof CopyPlugin>>(null);
  useImperativeHandle(ref, () => ({
    getHTML: () => {
      if (copyPluginRef.current) {
        return copyPluginRef.current.getHTML();
      }
      return Promise.reject();
    },
  }));

  // console.log(editorStateRef.current, "hello");

  return (
    <StyledEditor theme={colorMode}>
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container">
          <ToolbarPlugin />
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <TreeViewPlugin />
            <HistoryPlugin />
            {/* <AutoFocusPlugin /> */}
            <ListPlugin />
            <LinkPlugin />
            <AutoLinkPlugin />
            <CopyPlugin ref={copyPluginRef} />
          </div>
        </div>
      </LexicalComposer>
    </StyledEditor>
  );
});

Editor.displayName = "Editor";

export default Editor;

type CopyPluginMethods = {
  getHTML(): Promise<string>;
};

const CopyPlugin = forwardRef<CopyPluginMethods, unknown>((_, ref) => {
  const [editor] = useLexicalComposerContext();

  const getHTML = () => {
    return new Promise<string>((resolve) => {
      editor.getEditorState().read(() => {
        const html = $generateHtmlFromNodes(editor, null);
        resolve(html);
      });
    });
  };

  useImperativeHandle(ref, () => ({
    getHTML: getHTML,
  }));

  return null;
});

CopyPlugin.displayName = "CopyPlugin";
