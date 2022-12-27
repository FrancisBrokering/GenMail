import { Box, Text, Input, FormControl, FormLabel, Button, Divider, Select } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'

type NewEmailProps = {
  lang: string;
}

const NewEmail = (props: NewEmailProps) => {
  const { t } = useTranslation()
  const [emailDescription, setEmailDescription] = useState("");
  const [tone, setTone] = useState("formal");
  const [receiver, setReceiver] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResult] = useState(["", "", ""]);

  async function handleSubmit(event: React.FormEvent) {
    setIsGenerating(true)
    event.preventDefault()
    const data = {
      email: props.lang==='en'? 'write a ' + tone + ' email to ' + receiver + ' about ' + emailDescription + '.': tone + '語調で' + receiver + 'に' + emailDescription + 'ことについてのメールを書け。',
    };
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
    setReceiver("")
    setEmailDescription("")
  }

  return (
    <Box position={'relative'} >
      <Text textAlign='center' mb='100px' fontWeight="bold" fontSize='30px' >{t("email.newEmail.pageTitle")}</Text>
      <form onSubmit={handleSubmit}>
        <FormControl >
          <FormLabel fontWeight="bold" >{t("email.newEmail.about")}</FormLabel>
          <Input mb='15px' type='text' name="description" value={emailDescription}
            onChange={(e) => setEmailDescription(e.target.value)} placeholder={t("email.newEmail.examples.about") as string} />
          <FormLabel fontWeight="bold" >{t("email.newEmail.who")}</FormLabel>
          <Input mb='15px' type='text' name="receiver" value={receiver}
            onChange={(e) => setReceiver(e.target.value)} placeholder={t("email.newEmail.examples.who") as string} />
          <FormLabel fontWeight="bold" >{t("email.newEmail.tone")}</FormLabel>
          <Select mb='15px' placeholder={t("email.tone.button") as string} onChange={(e) => setTone(e.target.value)}>
            <option value={props.lang==='en'?'friendly':'フレンドリーな'}>😊 {t("email.tone.friendly")}</option>
            <option value={props.lang==='en'?'formal':'フォーマルな'}>💼 {t("email.tone.formal")}</option>
            <option value={props.lang==='en'?'angry':'怒っている'}>🤬 {t("email.tone.angry")}</option>
            <option value={props.lang==='en'?'casual':'カジュアルな'}>😌 {t("email.tone.casual")}</option>
            <option value={props.lang==='en'?'professional':'礼儀正しい'}>👔 {t("email.tone.professional")}</option>
          </Select>
          {isGenerating ? <Button mt='20px' isLoading loadingText='Generating' /> : <Button mt='20px' colorScheme='blue' bg='#0dc5ea' _hover={{ bg: "#7dc5ea" }} variant='solid' type="submit" >{t("email.newEmail.button")}</Button>}
        </FormControl>
      </form>
      <Box maxW='100%' whiteSpace='pre-wrap' pb='200px' >
        {results[0] === "" ? <></> : results.map((r, index) => {
          return (
            <Box key={index} mt='30px'>
              <Divider mt='10px' orientation='horizontal' />
              <Box mt='40px' rounded='5px' _hover={{ bg: "gray.100" }}>
                <Text fontWeight="bold"> {t("email.option")} {index + 1}</Text>
                <Text margin='5px 5px 5px 5px'>{r.replace(/^\s+|\s+$/g, '')}</Text>
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default NewEmail;
