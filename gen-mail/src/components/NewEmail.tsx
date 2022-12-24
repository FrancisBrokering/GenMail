import { Box, Stack, Input, FormControl, FormLabel, FormHelperText, Button } from '@chakra-ui/react';
import React, { useState } from 'react';


const URL = 'http://localhost:8080'
const options = {
  method: 'POST',
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ 'email': 'wite an email to francis'})
}


const NewEmail = () => {
  const [emailInput, setEmailInput] = useState("");
  const [result, setResult] = useState();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    // console.log(emailInput)
    const data = {
      email: emailInput, 
    };

    // console.log("json is", JSON.stringify(data))
    const response = await fetch(URL, options);
    
    const json = await response.json();
    console.log("result is: ", json);
    setResult(json.result);
    setEmailInput("");
  }

  return (
    <Box position={'relative'}>
      <form onSubmit={handleSubmit}>
        <FormControl >
        <FormLabel>Email Prompt</FormLabel>
        <Input mb='5px' type='text' name="email" value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)} />
        <Button _hover={{ color: "white", bg: "#0dc5ea" }} type="submit">Submit</Button>
        <FormHelperText>More detail the better.</FormHelperText>
        <p>{result}</p>
      </FormControl>
    </form>

    </Box>
  )
}

export default NewEmail;
