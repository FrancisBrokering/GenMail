import React, { useEffect } from "react";
import { Box, Text, } from '@chakra-ui/react';

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, $getSelection } from "lexical";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

export default function CountWordPlugin (): JSX.Element {
//   const root = $getRoot();
//   const content = root.getTextContent()
//   console.log(content);
  const editor = useLexicalComposerContext();

//   useEffect(() => {
//     const unregisterListener = editor.registerUpdateListener(({ editorState }) => {
//         // An update has occurred!
//         console.log(editorState);
//     });
//   }, [editor])
// editor.dispatchCommand(UNDO_COMMAND);
  
  
  
//   const editorState = editor.getEditorState()
console.log(editor)
    // const editorStateTextString = editorState.read(() =>
    //     $getRoot().getTextContent(),
    // );
    // console.log('editorStateTextString', editorStateTextString);
    // const wordCount = editorStateTextString.split(' ').length -1 ;`
    // console.log('wordCount', wordCount);

  return (
    <Box alignItems={'right'} width={'100%'}>
      <Text>Words: </Text>
    </Box>
  )
}
// export const INSERT_TWEET_COMMAND: LexicalCommand<string> = createCommand();

// export default function TwitterPlugin(): JSX.Element | null {
//   const [editor] = useLexicalComposerContext();

//   useEffect(() => {
//     if (!editor.hasNodes([TweetNode])) {
//       throw new Error('TwitterPlugin: TweetNode not registered on editor (initialConfig.nodes)');
//     }

//     return editor.registerCommand<string>(
//       INSERT_TWEET_COMMAND,
//       (payload) => {
//         const tweetNode = $createTweetNode(payload);
//         $insertNodeToNearestRoot(tweetNode);

//         return true;
//       },
//       COMMAND_PRIORITY_EDITOR,
//     );
//   }, [editor]);

//   return null;
// }