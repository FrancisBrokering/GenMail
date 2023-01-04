import { Box, Text, Input, FormControl, FormLabel, Button, Divider, Select } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'
import GeneratedText from '../common/GeneratedText';

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
      email: props.lang==='en'? 'write a ' + tone + ' email to ' + receiver + ' about ' + emailDescription + '.': tone + 'な口調で' + receiver + 'に' + emailDescription + 'ことについてのメールを書け。',
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
          <Select mb='15px' placeholder={t("tone.button") as string} onChange={(e) => setTone(e.target.value)}>
            <option value={t("tone.friendly") as string}>😊 {t("tone.friendly")}</option>
            <option value={t("tone.formal") as string}>💼 {t("tone.formal")}</option>
            <option value={t("tone.angry") as string}>🤬 {t("tone.angry")}</option>
            <option value={t("tone.casual") as string}>😌 {t("tone.casual")}</option>
            <option value={t("tone.professional") as string}>👔 {t("tone.professional")}</option>
          </Select>
          {isGenerating ? <Button mt='20px' isLoading loadingText='Generating' /> : <Button mt='20px' colorScheme='blue' bg='#0dc5ea' _hover={{ bg: "#7dc5ea" }} variant='solid' type="submit" >{t("email.newEmail.button")}</Button>}
        </FormControl>
      </form>
      <Box maxW='100%' whiteSpace='pre-wrap' pb='200px' >
        {results[0] === "" ? <></> : results.map((r, index) => {
          return (
            <GeneratedText key={index} index={index} result={r} />
          )
        })}
      </Box>
    </Box>
  )
}

export default NewEmail;
