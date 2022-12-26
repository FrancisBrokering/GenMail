import { Box, Text, Input, FormControl, FormLabel, Button, Divider, Select, Textarea } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const ReviewEmail = () => {
    const [oldEmail, setOldEmail] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [results, setResult] = useState(["", "", ""]);

    useEffect (() => {
        console.log("results is: ", oldEmail)
    }, [oldEmail])

    async function handleSubmit(event: React.FormEvent) {
        setIsGenerating(true)
        event.preventDefault()
        const data = {
            email: 'make this email sound better ' + oldEmail,
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
        setOldEmail("")
    }

    return (
        <Box position={'relative'} >
            <Text textAlign='center' mb='100px' fontWeight="bold" fontSize='30px' >Make Your Email Sound Better</Text>
            <form onSubmit={handleSubmit}>
                <FormControl >
                    <FormLabel fontWeight="bold" >Paste the Email you want to review</FormLabel>
                    <Textarea mb='15px' minH='200px' name="oldEmail" value={oldEmail}
                        onChange={(e) => setOldEmail(e.target.value)} />
                    {isGenerating ? <Button mt='20px' isLoading loadingText='Generating' /> : <Button mt='20px' colorScheme='blue' bg='#0dc5ea' _hover={{ bg: "#7dc5ea" }} variant='solid' type="submit" >Cleanup Email</Button>}
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

export default ReviewEmail;
