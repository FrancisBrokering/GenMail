import React, { useState, useEffect } from 'react';
import { Box, Flex, Spacer, Text, Textarea, Button, useClipboard } from '@chakra-ui/react';
import styled from '@emotion/styled';
// import GetEditerLogo from '../data/GetEditerLogo';
import Editor from './editor/Editor';

const countWords = (str : string) => {
  const arr = str.split(' ');
  return arr.filter(word => word !== '').length;
}

const EditArea = () => {
  const { onCopy, value, setValue, hasCopied } = useClipboard("");

  return (
    <Box borderLeft={'1px solid gray'} borderBottom={'1px solid gray'} borderRight={'1px solid gray'}>
      {/* <Text fontWeight={'bold'} width={'100%'}>Paste your email</Text> */}
      <Editor></Editor>
      {/* <Textarea 
        bg='white'
        height={'90vh'} 
        width={'100%'} 
        border={'1px solid black'} 
        borderRadius={'10px'} 
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />  */}
      <Flex margin={'10px'} >
        <Button onClick={onCopy} mt={2} bg='#0dc5ea' _hover={{ bg: "#7dc5ea" }} color={'white'}>{hasCopied ? 'Copied' : 'Copy'}</Button>
        <Spacer />
        <Text mr={2} verticalAlign='center'>Words: {countWords(value)}</Text>
      </Flex>
    </Box>
  )
}

const StyledLogos = styled('ul')`
  display: flex;
  list-style-type: none;
  margin: 10px 5px;

  li {
    margin: 0px 7px;
  }
`

export default EditArea;
