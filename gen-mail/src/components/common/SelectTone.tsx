import {
    Box,
    FormLabel,
    Select,
    useColorModeValue,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";

type SelectToneProps = {
    setTone: ((tone: string) => void);
};

const SelectTone = (props: SelectToneProps) => {
    const { t } = useTranslation();
    const Placeholder_Color = useColorModeValue("gray.500", "gray.200")
    
    return (
        <Box>
            <FormLabel>④{t("tone.label")}</FormLabel>
            <Select
                placeholder={t("tone.button") as string}
                _placeholder={{ color: Placeholder_Color }}
                onChange={(e) => props.setTone(e.target.value)}
                required
            >
                <option value={"friendly"}>
                    😊 {t("tone.friendly")}
                </option>
                <option value={"casual"}>
                    😌 {t("tone.casual")}
                </option>
                <option value={"formal"}>
                    💼 {t("tone.formal")}
                </option>
                <option value={"professional"}>
                    👔 {t("tone.professional")}
                </option>
                <option value={"angry"}>
                    🤬 {t("tone.angry")}
                </option>
                <option value={"sad"}>
                    😢 {t("tone.sad")}
                </option>
            </Select>
        </Box>
    );
};

export default SelectTone;