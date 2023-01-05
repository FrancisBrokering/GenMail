import React, { useEffect, useState } from 'react';
import NewEmail from '../components/Email/NewEmail';
import { Box, Select, Grid, GridItem } from '@chakra-ui/react';
import ReviewEmail from '../components/Email/ReviewEmail';
import { useTranslation } from "react-i18next";
import EditArea from '../components/EditArea';
import Sidebar from '../components/SideBar';
import NewSns from '../components/SNS/NewSns';
import ReplyChat from '../components/Chat/ReplyChat';

const ChatPage = () => {
    const [generateOption, setGenerateOption] = useState("Reply");
    const [language, setLanguage] = useState("ja");
    const { t, i18n } = useTranslation()

    useEffect(() => {
        i18n.changeLanguage(language)
    }, [language])

    function GenerateOption() {
        switch (generateOption) {
            case "Reply":
                return (<ReplyChat lang={language} />)
            case "Review":
                return (<ReviewEmail lang={language} />)
            default:
                return (<NewSns lang={language} />);
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
                            {/* <option value='New'>🆕 {t("sns.newSns.option")}</option> */}
                            <option value='Reply'>💬 {t("chat.replyChat.option")}</option>
                            {/* <option value='Edit'>📧 {t("sns.editEmail.option")}</option>
                            <option value='Review'>📨 {t("sns.reviewEmail.option")}</option> */}
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

export default ChatPage