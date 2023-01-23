import React from "react";
import { ReactComponent as GenPlateIcon } from "../assets/icons/GenPlateIcon.svg";
// import { ReactComponent as GenPlateLogoDark } from "../assets/icons/GenPlateLogoDarkMode.svg";

const GetIcon = (name: string, w: string, h: string) => {
  if (name === "GenPlateIcon") return <GenPlateIcon width={w} height={h} />;
//   if (name === "GenPlateLogoDark")
//     return <GenPlateLogoDark width={w} height={h} />;
};

export default GetIcon;
