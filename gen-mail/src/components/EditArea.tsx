import React, { useState } from 'react';
import { Box, Flex, Spacer, Text, Textarea, Button, useClipboard } from '@chakra-ui/react';
import { setEmitFlags } from 'typescript';

const countWords = (str : string) => {
  const arr = str.split(' ');
  return arr.filter(word => word !== '').length;
}

const EditArea = () => {
  const { onCopy, value, setValue, hasCopied } = useClipboard("");

  return (
    <Box position={'sticky'}>
      <Text fontWeight={'bold'} width={'100%'}>Paste your email</Text>
      <Textarea 
        height={'90vh'} 
        width={'100%'} 
        border={'1px solid black'} 
        borderRadius={'10px'} 
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Flex>
        <Button onClick={onCopy} mt={2} bg='#0dc5ea' _hover={{ bg: "#7dc5ea" }} color={'white'}>{hasCopied ? 'Copied' : 'Copy'}</Button>
        <Spacer />
        <Text mr={2} >Words: {countWords(value)}</Text>
      </Flex>
      
    </Box>
  )
}

export default EditArea;