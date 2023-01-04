import { Box, Text, Input, FormControl, FormLabel, Button, Divider, Select } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'
import GeneratedText from '../common/GeneratedText';

type NewEmailProps = {
  lang: string;
}

const NewSns = (props: NewEmailProps) => {
  const { t } = useTranslation()
  const [postDescription, setPostDescription] = useState("");
  const [tone, setTone] = useState("formal");
  const [platform, setPlatform] = useState("instagram");
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResult] = useState(["", "", ""]);

  async function handleSubmit(event: React.FormEvent) {
    setIsGenerating(true)
    event.preventDefault()
    const data = {
      email: props.lang==='en'? 'Create a ' + platform + ' post about ' + postDescription + '.': tone + 'な口調で' + postDescription + 'ことについての' + platform + 'の投稿を英語で作って。',
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
    setPostDescription("")
  }

  return (
    <Box position={'relative'} >
      <Text textAlign='center' mb='100px' fontWeight="bold" fontSize='30px' >{t("sns.newSns.pageTitle")}</Text>
      <form onSubmit={handleSubmit}>
        <FormControl >
        <FormLabel fontWeight="bold" >{t("sns.newSns.platform")}</FormLabel>
          <Select mb='15px' placeholder={t("sns.platform.button") as string} onChange={(e) => setPlatform(e.target.value)}>
            <option value={t("sns.platform.instagram") as string }>{t("sns.platform.instagram")}</option>
            <option value={t("sns.platform.twitter") as string }>{t("sns.platform.facebook")}</option>
            <option value={t("sns.platform.twitter") as string }>{t("sns.platform.twitter")}</option>
            <option value={t("sns.platform.youtube") as string }>{t("sns.platform.youtube")}</option>
          </Select>
          <FormLabel fontWeight="bold" >{t("sns.newSns.about")}</FormLabel>
          <Input mb='15px' type='text' name="description" value={postDescription}
            onChange={(e) => setPostDescription(e.target.value)} placeholder={t("sns.newSns.examples.about") as string} />
          <FormLabel fontWeight="bold" >{t("email.newEmail.tone")}</FormLabel>
          <Select mb='15px' placeholder={t("tone.button") as string} onChange={(e) => setTone(e.target.value)}>
            <option value={t("tone.friendly") as string}>😊 {t("tone.friendly")}</option>
            <option value={t("tone.formal") as string}>💼 {t("tone.formal")}</option>
            <option value={t("tone.angry") as string}>🤬 {t("tone.angry")}</option>
            <option value={t("tone.casual") as string }>😌 {t("tone.casual")}</option>
            <option value={t("tone.professional") as string }>👔 {t("tone.professional")}</option>
          </Select>
          {isGenerating ? <Button mt='20px' isLoading loadingText='Generating' /> : <Button mt='20px' colorScheme='blue' bg='#0dc5ea' _hover={{ bg: "#7dc5ea" }} variant='solid' type="submit" >{t("sns.newSns.button")}</Button>}
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

export default NewSns;
