import React, { useRef, useEffect, forwardRef } from "react";
import { useColorMode } from "@chakra-ui/react";
import ExampleTheme from "./themes/ExampleTheme";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
// import TreeViewPlugin from "./plugins/TreeViewPlugin";
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
import { EditorState } from "lexical";

import { useTranslation } from "react-i18next";

function Placeholder() {
  const { t, i18n } = useTranslation();
  return <div className="editor-placeholder">{t("editor.placeHolder")}</div>;
}

// eslint-disable-next-line react/display-name
const Editor = forwardRef<EditorState>((props, ref) => {
  const { colorMode } = useColorMode();
  const editorStateRef = useRef<EditorState>();
  const editorConfig = {
    // editorState:
    //   '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}',
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
  console.log(editorStateRef.current);
  console.log(ref);

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
            <OnChangePlugin
              onChange={(editorState) => (editorStateRef.current = editorState)}
            />
            <TreeViewPlugin />
            <HistoryPlugin />
            {/* <AutoFocusPlugin /> */}
            <ListPlugin />
            <LinkPlugin />
            <AutoLinkPlugin />
          </div>
        </div>
      </LexicalComposer>
    </StyledEditor>
  );
});

export default Editor;
