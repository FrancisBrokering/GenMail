import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  INDENT_CONTENT_COMMAND,
  KEY_TAB_COMMAND,
  OUTDENT_CONTENT_COMMAND,
} from "lexical";

export default function EnableTabIndent(): any {
  const [editor] = useLexicalComposerContext();
  editor.registerCommand<KeyboardEvent>(
    KEY_TAB_COMMAND,
    (payload) => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) {
        return false;
      }
      const event: KeyboardEvent = payload;
      event.preventDefault();
      return editor.dispatchCommand(
        event.shiftKey ? OUTDENT_CONTENT_COMMAND : INDENT_CONTENT_COMMAND,
        undefined
      );
    },
    COMMAND_PRIORITY_EDITOR
  );
}

EnableTabIndent.displayName = "EnableTabIndent";
