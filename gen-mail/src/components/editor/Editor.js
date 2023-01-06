import React, { useEffect } from "react";
import ExampleTheme from "./themes/ExampleTheme";
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
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";

import { $getRoot, $getSelection } from "lexical";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import "./style.css";
import Toolbar from "./plugins/Toolbar";
// import ToolbarPlugin from "./plugins/ToolbarPlugins";

// import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
// import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
// import AutoLinkPlugin from "./plugins/AutoLinkPlugin";

function Placeholder() {
  return <div className="editor-placeholder">Paste your text here...</div>;
}

const editorConfig = {
  // The editor theme
  theme: ExampleTheme,
  // Handling of errors during update
  // onError(error: any) {
  //   throw error;
  // },
  // Any custom nodes go here
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

// const theme = {
//   // Theme styling goes here
//   // ...
// };

// function onChange(editorState: { read: (arg0: () => void) => void }) {
//   editorState.read(() => {
//     // Read the contents of the EditorState here.
//     const root = $getRoot();
//     const selection = $getSelection();

//     console.log(root, selection);
//   });
// }

// function MyCustomAutoFocusPlugin() {
//   const [editor] = useLexicalComposerContext();

//   useEffect(() => {
//     // Focus the editor when the effect fires!
//     editor.focus();
//   }, [editor]);

//   return null;
// }

// function onError(error: any) {
//   console.error(error);
// }

export default function Editor() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <Toolbar />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          {/* <OnChangePlugin onChange={onChange} /> */}
          <HistoryPlugin />
          {/* <MyCustomAutoFocusPlugin /> */}
          {/* <AutoFocusPlugin /> */}
          {/* <ListPlugin />
          <LinkPlugin /> */}
        </div>
      </div>
    </LexicalComposer>
    // <LexicalComposer initialConfig={initialConfig}>
    //   <div className="editor-container">
    //     {/* <ToolbarPlugin /> */}
    //     <div className="editor-inner">
    //       <RichTextPlugin
    //         contentEditable={<ContentEditable className="editor-input" />}
    //         placeholder={<Placeholder />}
    //         ErrorBoundary={LexicalErrorBoundary}
    //       />
    //       <HistoryPlugin />
    //       {/* <TreeViewPlugin /> */}
    //       <AutoFocusPlugin />
    //       {/* <CodeHighlightPlugin /> */}
    //       <ListPlugin />
    //       <LinkPlugin />
    //       {/* <AutoLinkPlugin /> */}
    //       {/* <ListMaxIndentLevelPlugin maxDepth={7} /> */}
    //       <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
    //     </div>
    //   </div>
    // </LexicalComposer>
  );
}
