import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  INDENT_CONTENT_COMMAND,
  KEY_TAB_COMMAND,
  LexicalEditor,
  OUTDENT_CONTENT_COMMAND,
  PASTE_COMMAND,
  DEPRECATED_$isGridSelection,
  LexicalCommand,
  createCommand,
  CommandPayloadType,
  PasteCommandType,
} from "lexical";
import { $insertDataTransferForPlainText } from "@lexical/clipboard";

function onPasteForRichText(
    event: CommandPayloadType<typeof PASTE_COMMAND>,
    editor: LexicalEditor,
): void {
    event.preventDefault();
    editor.update(
        () => {
        const selection = $getSelection();
        const clipboardData =
            event instanceof InputEvent || event instanceof KeyboardEvent
            ? null
            : event.clipboardData;
        if (
            clipboardData != null &&
            ($isRangeSelection(selection) || DEPRECATED_$isGridSelection(selection))
        ) {
            $insertDataTransferForPlainText(clipboardData, selection);
        }
        },
        {
        tag: 'paste',
        },
    );
}

export function eventFiles(
    event: DragEvent | PasteCommandType,
): [boolean, Array<File>, boolean] {
    let dataTransfer: null | DataTransfer = null;
    if (event instanceof DragEvent) {
        dataTransfer = event.dataTransfer;
    } else if (event instanceof ClipboardEvent) {
        dataTransfer = event.clipboardData;
    }

    if (dataTransfer === null) {
        return [false, [], false];
    }

    const types = dataTransfer.types;
    const hasFiles = types.includes('Files');
    const hasContent =
        types.includes('text/html') || types.includes('text/plain');
    return [hasFiles, Array.from(dataTransfer.files), hasContent];
}

export const DRAG_DROP_PASTE: LexicalCommand<Array<File>> = createCommand(
    'DRAG_DROP_PASTE_FILE',
);

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

    editor.registerCommand(
        PASTE_COMMAND,
        (event) => {
            const [, files, hasTextContent] = eventFiles(event);
            if (files.length > 0 && !hasTextContent) {
            editor.dispatchCommand(DRAG_DROP_PASTE, files);
            return true;
            }

            const selection = $getSelection();
            if (
            $isRangeSelection(selection) ||
            DEPRECATED_$isGridSelection(selection)
            ) {
            onPasteForRichText(event, editor);
            return true;
            }

            return false;
        },
        COMMAND_PRIORITY_EDITOR,
    );
}

EnableTabIndent.displayName = "EnableTabIndent";
