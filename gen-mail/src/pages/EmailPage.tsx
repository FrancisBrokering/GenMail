import React, { useEffect, useState } from 'react';
import NewEmail from '../components/Email/NewEmail';
import { Box, Select, Grid, GridItem } from '@chakra-ui/react';
import ReplyEmail from '../components/Email/ReplyEmail';
import ReviewEmail from '../components/Email/ReviewEmail';
import EditEmail from '../components/Email/EditEmail';
import { useTranslation } from "react-i18next";
import EditArea from '../components/EditArea';
import Sidebar from '../components/SideBar';

const EmailPage = () => {
    const [generateOption, setGenerateOption] = useState("New");
    const [language, setLanguage] = useState("ja");
    const { t, i18n } = useTranslation()

    useEffect(() => {
        i18n.changeLanguage(language)
    }, [language])

    function GenerateOption() {
        switch (generateOption) {
            case "New":
                return (<NewEmail lang={language} />)
            case "Reply":
                return (<ReplyEmail lang={language} />)
            case "Edit":
                return (<EditEmail lang={language} />)
            case "Review":
                return (<ReviewEmail lang={language} />)
            default:
                return (<NewEmail lang={language} />);
        }
    }
    return (
        <Sidebar >
            <Grid templateColumns={'repeat(5, 1fr)'}>
                <GridItem colSpan={3}>
                    <Box margin='100px 20px 0px 20px'>
                        <Select mb='15px' onChange={(e) => setLanguage(e.target.value)} w='300px'>
                            <option value="ja">JP 🇯🇵</option>
                            <option value="en">EN 🇺🇸</option>
                        </Select>
                        <Select mb='15px' onChange={(e) => setGenerateOption(e.target.value)} w='300px'>
                            <option value='New'>✉️ {t("email.newEmail.option")}</option>
                            <option value='Reply'>📩 {t("email.replyEmail.option")}</option>
                            <option value='Edit'>📧 {t("email.editEmail.option")}</option>
                            <option value='Review'>📨 {t("email.reviewEmail.option")}</option>
                        </Select>
                        {GenerateOption()}
                    </Box>
                </GridItem>
                <GridItem colSpan={2}>
                    <EditArea></EditArea>
                </GridItem>
            </Grid>
        </Sidebar>
    )
}

export default EmailPage