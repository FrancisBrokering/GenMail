import React from "react";
import { ReactComponent as GenPlateLogo } from "../assets/icons/GenPlateLogo.svg";
import { ReactComponent as GenPlateLogoDark } from "../assets/icons/GenPlateLogoDarkMode.svg";

const GetIcon = (name: string, w: string, h: string) => {
  if (name === "GenPlateLogo") return <GenPlateLogo width={w} height={h} />;
  if (name === "GenPlateLogoDark")
    return <GenPlateLogoDark width={w} height={h} />;
};

export default GetIcon;
