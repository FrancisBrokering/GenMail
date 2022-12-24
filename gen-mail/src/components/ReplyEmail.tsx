import { Box, Text, Input, FormControl, FormLabel, Button, Divider, Select, Textarea } from '@chakra-ui/react';
import React, { useState } from 'react';

const ReplyEmail = () => {
    const [emailDescription, setEmailDescription] = useState("");
    const [tone, setTone] = useState("formal");
    const [reply, setReply] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [results, setResult] = useState(["", "", ""]);

    async function handleSubmit(event: React.FormEvent) {
        setIsGenerating(true)
        event.preventDefault()
        let details = emailDescription
        if (emailDescription != "") {
            details = ' including the details ' + emailDescription + ' '
        }
        const data = {
            email: 'In a' + tone + ' tone, write an reply to the following email ' + details + ': '  + reply,
        };
        console.log("data is: ", data)
        const response = await fetch("http://localhost:8080", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const json = await response.json()
        console.log("result is: ", json)
        setIsGenerating(false)
        setResult(json.result)
        setReply("")
        setEmailDescription("")
    }

    return (
        <Box position={'relative'} >
            <Text textAlign='center' mb='100px' fontWeight="bold" fontSize='30px' >Generate Email Reply</Text>
            <form onSubmit={handleSubmit}>
                <FormControl >
                    <FormLabel fontWeight="bold" >Paste the Email you received</FormLabel>
                    <Textarea mb='15px' minH='200px' name="reply" value={reply}
                        onChange={(e) => setReply(e.target.value)} />
                    <FormLabel fontWeight="bold" >What do you want to say?</FormLabel>
                    <Input mb='15px' type='text' name="description" value={emailDescription}
                        onChange={(e) => setEmailDescription(e.target.value)} placeholder='(optional) e.g. available at 2 pm on Tuesday' />
                    <FormLabel fontWeight="bold" >Choose a tone</FormLabel>
                    <Select mb='15px' placeholder='Select tone' onChange={(e) => setTone(e.target.value)}>
                        <option value='friendly'>😊 Friendly</option>
                        <option value='formal'>💼 Formal</option>
                        <option value='empathetic'>🤗 Empathetic</option>
                        <option value='angry'>🤬 Angry</option>
                        <option value='casual'>😌 casual</option>
                        <option value='professional'>👔 Professional</option>
                    </Select>
                    {isGenerating ? <Button mt='20px' isLoading loadingText='Generating' /> : <Button mt='20px' colorScheme='blue' bg='#0dc5ea' _hover={{ bg: "#7dc5ea" }} variant='solid' type="submit" >Generate Email Reply</Button>}
                </FormControl>
            </form>
            <Box maxW='100%' whiteSpace='pre-wrap' pb='200px' >
                {results[0] === "" ? <></> : results.map((r, index) => {
                    return (
                        <Box key={index} mt='30px'>
                            <Divider mt='10px' orientation='horizontal' />
                            <Box mt='40px' rounded='5px' _hover={{ bg: "gray.100" }}>
                                <Text fontWeight="bold"> Option {index + 1}</Text>
                                <Text margin='5px 5px 5px 5px'>{r.replace(/^\s+|\s+$/g, '')}</Text>
                            </Box>
                        </Box>
                    )
                })}
            </Box>
        </Box>
    )
}

export default ReplyEmail;
