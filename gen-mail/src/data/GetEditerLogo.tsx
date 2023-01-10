import React from "react";
import { ReactComponent as Instagram } from "../assets/icons/Instagram.svg";
import { ReactComponent as Twitter } from "../assets/icons/Twitter.svg";
import { ReactComponent as Facebook } from "../assets/icons/Facebook.svg";
import { ReactComponent as Linkedin } from "../assets/icons/Linkedin.svg";
import { SmallAddIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

const GetPlatformLogo = ( name: string, w: string, h: string ) => {
  const { t } = useTranslation();
  if (name === "Instagram") return <Instagram width={w} height={h} />;
  if (name === "Twitter") return <Twitter width={w} height={h} />;
  if (name === "Facebook") return <Facebook width={w} height={h} />;
  if (name === "Linkedin") return <Linkedin  width={w} height={h} />;
  if (name === t("other")) return <SmallAddIcon width={w} height={h} />;
};

export default GetPlatformLogo;
