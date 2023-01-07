import React from "react";
import { ReactComponent as Instagram } from "../assets/icons/Instagram.svg";
import { ReactComponent as Twitter } from "../assets/icons/Twitter.svg";
import { ReactComponent as Facebook } from "../assets/icons/Facebook.svg";
import { ReactComponent as Linkedin } from "../assets/icons/Linkedin.svg";

const GetPlatformLogo = ( name: string, w: string, h: string ) => {
  if (name === "Instagram") return <Instagram width={w} height={h} />;
  if (name === "Twitter") return <Twitter width={w} height={h} />;
  if (name === "Facebook") return <Facebook width={w} height={h} />;
  if (name === "Linkedin") return <Linkedin  width={w} height={h} />;
};

export default GetPlatformLogo;
